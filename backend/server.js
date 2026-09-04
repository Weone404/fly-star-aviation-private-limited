const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const https = require("https");
const { formidable } = require('formidable');
const cloudinary = require("cloudinary").v2;
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config({ path: __dirname + "/.env" });

const Contact = require("./models/Contact");
const { notifyEnquiry } = require("./notifyEnquiry");
const { isHoneypotTripped, createRateLimiter, clientIp } = require("./enquiryGuard");
const blogStore = require("./blogStore");

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});


// ── Vercel deploy hook ────────────────────────────────────────────────────────
// Prerendering happens at build time, so a post written here is not crawlable
// until the site rebuilds. This nudges Vercel after a successful blog write.
//
// It publishes NOTHING on its own. A rebuild only picks up posts whose slug is
// on the approval list in src/lib/blogApproval.ts with a matching content hash,
// so an unapproved or edited post triggers a build and is still held back.
//
// Set VERCEL_DEPLOY_HOOK_URL in the backend environment. Treat it as a secret:
// anyone holding it can trigger builds. If it is unset, this is a no-op and blog
// writes behave exactly as before.
function triggerRebuild(reason) {
    const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (!hook) return;

    try {
        const req = https.request(hook, { method: "POST", timeout: 10000 }, (res) => {
            res.resume();
            console.log(`[deploy-hook] ${reason} -> HTTP ${res.statusCode}`);
        });
        // A failed hook must never fail the blog write that triggered it — the
        // post is already saved, and the nightly rebuild is the fallback.
        req.on("error", (e) => console.warn(`[deploy-hook] ${reason} failed: ${e.message}`));
        req.on("timeout", () => { console.warn(`[deploy-hook] ${reason} timed out`); req.destroy(); });
        req.end();
    } catch (e) {
        console.warn(`[deploy-hook] ${reason} threw: ${e.message}`);
    }
}

// ── MongoDB Native Client (for blogs) ─────────────────────────────────────────
const mongoClient = new MongoClient(process.env.MONGODB_URI);

let db;
let mongoConnected = false;

// Public, unauthenticated endpoint — see AUDIT.md §6. These are the only guards.
const enquiryLimiter = createRateLimiter({ max: 5, windowMs: 10 * 60 * 1000 });

mongoClient.connect()
    .then(() => {
        db = mongoClient.db("flystarDB");   // ✅ flystar database — separate from WeOne
        mongoConnected = true;
        console.log("✅ MongoDB Native Client Connected → flystar DB");
    })
    .catch(err => {
        mongoConnected = false;
        console.error("❌ MongoDB Native Client Error:", err.message);
        console.log("⚠️  Using file-based blog storage fallback");
    });

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:8080",
        "https://www.flystar.co.in",
        "https://flystar.co.in",
        "https://fly-star-aviation-private-limited.onrender.com",
        "https://fly-star-aviation-private-limited.vercel.app",
    ]
}));
app.use(express.json());

// ── Mongoose (for contacts) ───────────────────────────────────────────────────
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Mongoose Connected"))
    .catch((err) => console.error("❌ Mongoose Connection Error:", err));

// ════════════════════════════════════════════════════════════════════════════
// CONTACT ROUTES
// ════════════════════════════════════════════════════════════════════════════

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, phone, interest, message } = req.body;

        // Honeypot: a field no human sees. Answer 201 anyway — telling a bot it
        // was detected just teaches it which field to leave alone next time.
        if (isHoneypotTripped(req.body)) {
            console.log("[enquiry] honeypot tripped, discarded");
            return res.status(201).json({ success: true, message: "Contact saved successfully!" });
        }

        const limit = enquiryLimiter.check(clientIp(req));
        if (!limit.allowed) {
            return res.status(429).json({
                success: false,
                error: "Too many enquiries from this connection. Please try again shortly.",
            });
        }

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                error: "Name, email, and phone are required.",
            });
        }
        const contact = {
            name,
            email,
            phone,
            interest: interest || "Not specified",
            message: message || "No additional message",
        };
        const newContact = new Contact(contact);
        await newContact.save();

        // Fire and forget. The enquiry is saved; the response must not wait on an
        // email, and a mail failure must never surface as a failed submission.
        notifyEnquiry(contact).catch((e) => console.warn("[enquiry-mail] unexpected:", e?.message));

        res.status(201).json({ success: true, message: "Contact saved successfully!" });
    } catch (err) {
        console.error("Save error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ── GET /api/contacts — REMOVED 2026-09-04 ───────────────────────────────────
// This route returned every contact-form submission — name, email, phone,
// interest, message — to anyone who requested the URL. No authentication, and
// the CORS allowlist above does not help: CORS governs what a browser lets a
// page read cross-origin, and has no effect on curl or any server-side request.
//
// That is personal data of prospective students under India's DPDP Act, 2023.
// Nothing in the frontend called this route (verified by grep across src/, api/
// and index.html), so it was removed outright rather than protected. Removal is
// not an access-control change: there is still no auth middleware anywhere, by
// the owner's standing decision.
//
// To read enquiries, query the contacts collection directly. If a UI is wanted
// later, it needs authentication first — do not restore this route as it was.

// ════════════════════════════════════════════════════════════════════════════
// BLOG ROUTES — all stored in flystar DB → blogs collection
// ════════════════════════════════════════════════════════════════════════════

// ── GET /api/blogs — fetch all blogs ─────────────────────────────────────────
app.get("/api/blogs", async (req, res) => {
    try {
        let blogs;
        if (mongoConnected && db) {
            blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray();
            const serialized = blogs.map(b => ({
                ...b,
                _id: b._id.toString(),
                createdAt: b.createdAt ? b.createdAt.toString() : new Date().toString(),
            }));
            return res.status(200).json(serialized);
        } else {
            // Fallback to file-based storage
            blogs = blogStore.getAllBlogs();
            return res.status(200).json(blogs);
        }
    } catch (e) {
        console.error("GET /api/blogs error:", e.message);
        // Last resort: return file-based blogs
        const blogs = blogStore.getAllBlogs();
        return res.status(200).json(blogs);
    }
});

// ── GET /api/blogs/:id — fetch single blog (by ID or slug) ────────────────────
app.get("/api/blogs/:id", async (req, res) => {
    try {
        const identifier = String(req.params.id || "").trim();
        if (!identifier) {
            return res.status(400).json({ success: false, message: "Blog identifier is required" });
        }

        let blog = null;

        if (mongoConnected && db) {
            const blogsCollection = db.collection("blogs");
            if (mongoose.Types.ObjectId.isValid(identifier)) {
                blog = await blogsCollection.findOne({ _id: new ObjectId(identifier) });
            }

            if (!blog) {
                blog = await blogsCollection.findOne({ slug: identifier });
            }

            if (blog) {
                return res.status(200).json({
                    ...blog,
                    _id: blog._id.toString(),
                    createdAt: blog.createdAt ? blog.createdAt.toString() : new Date().toString(),
                });
            }
        }

        // File storage uses UUIDs, so try its id first and then its slug as well.
        blog = blogStore.getBlogById(identifier) || blogStore.getBlogBySlug(identifier);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        return res.status(200).json(blog);
    } catch (e) {
        console.error("GET /api/blogs/:id error:", e);
        return res.status(500).json({ success: false, message: "Unexpected error loading blog" });
    }
});

// ── POST /api/blogs — create new blog ────────────────────────────────────────
app.post("/api/blogs", (req, res) => {
    const form = formidable({
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ success: false, message: "File upload failed" });
        }

        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const excerpt = Array.isArray(fields.excerpt) ? fields.excerpt[0] : fields.excerpt;
        const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;
        const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and content are required" });
        }

        let coverImage = "";
        if (files.coverImage) {
            const file = Array.isArray(files.coverImage) ? files.coverImage[0] : files.coverImage;
            try {
                const uploaded = await cloudinary.uploader.upload(file.filepath, {
                    folder: "flystar/blogs",   // ✅ flystar cloudinary folder
                });
                coverImage = uploaded.secure_url;
            } catch (uploadErr) {
                console.warn("Image upload failed, continuing without image:", uploadErr.message);
                // Don't fail entirely, allow blog to be created without image
            }
        }

        // Strip what is not a word character FIRST, then hyphenate, then collapse
        // and trim. The previous order hyphenated first and stripped punctuation
        // afterwards, so an en dash, an ampersand or an emoji left its hyphen
        // behind: "12th - Eligibility, Fees & Scope" became
        // "12th--eligibility-fees--scope", and a title starting or ending with a
        // symbol produced a leading or trailing hyphen.
        // Affects NEW posts only; slugs already stored are unchanged.
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, " ")
            .trim()
            .replace(/[\s-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        const blogData = {
            title,
            excerpt: excerpt || "",
            content,
            coverImage,
            category: category || "Blog",
            slug,
        };

        try {
            if (mongoConnected && db) {
                try {
                    const result = await db.collection("blogs").insertOne({
                        ...blogData,
                        createdAt: new Date(),
                    });
                    console.log("✅ Blog saved to MongoDB");
                    triggerRebuild("blog created");
                    return res.status(200).json({ success: true, id: result.insertedId.toString() });
                } catch (mongoErr) {
                    console.warn("MongoDB save failed, using file storage:", mongoErr.message);
                }
            }
            // Fallback to file-based storage
            const blog = blogStore.createBlog(blogData);
            console.log("✅ Blog saved to file storage");
            triggerRebuild("blog created (file storage)");
            return res.status(200).json({ success: true, id: blog._id });
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    });
});

// ── PUT /api/blogs/:id — update existing blog ─────────────────────────────────
app.put("/api/blogs/:id", (req, res) => {
    const form = formidable({
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ success: false, message: "File upload failed" });
        }

        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const excerpt = Array.isArray(fields.excerpt) ? fields.excerpt[0] : fields.excerpt;
        const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;
        const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and content are required" });
        }

        // Build update object — only replace image if a new one was uploaded
        const update = {
            title,
            excerpt: excerpt || "",
            content,
            category: category || "Blog",
            updatedAt: new Date(),
        };

        if (files.coverImage) {
            const file = Array.isArray(files.coverImage) ? files.coverImage[0] : files.coverImage;
            try {
                const uploaded = await cloudinary.uploader.upload(file.filepath, {
                    folder: "flystar/blogs",
                });
                update.coverImage = uploaded.secure_url;
            } catch (uploadErr) {
                console.warn("Image upload failed, continuing without new image:", uploadErr.message);
            }
        }

        try {
            if (mongoConnected && db) {
                try {
                    const result = await db.collection("blogs").updateOne(
                        { _id: new ObjectId(req.params.id) },
                        { $set: update }
                    );
                    if (result.matchedCount === 0) {
                        throw new Error("Blog not found in MongoDB");
                    }
                    console.log("✅ Blog updated in MongoDB");
                    return res.status(200).json({ success: true, message: "Blog updated" });
                } catch (mongoErr) {
                    console.warn("MongoDB update failed, using file storage:", mongoErr.message);
                }
            }
            // Fallback to file-based storage
            const updated = blogStore.updateBlog(req.params.id, update);
            if (!updated) {
                return res.status(404).json({ success: false, message: "Blog not found" });
            }
            console.log("✅ Blog updated in file storage");
            triggerRebuild("blog updated");
            return res.status(200).json({ success: true, message: "Blog updated" });
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    });
});

// ── DELETE /api/blogs/:id — DISABLED 2026-09-04 ──────────────────────────────
// Unauthenticated, this route let anyone permanently erase the entire posts
// collection, and no backup existed. Its only caller was the delete button in
// the admin panel, which has been removed.
//
// The version on origin/main added a file-storage fallback to the same open
// delete. That is deliberately NOT merged: a fallback makes an unauthenticated
// destructive route work in more situations, which is the opposite of what was
// wanted. Deletions are done directly against the database.
//
// It answers 405 rather than being removed, so an old client gets a clear
// refusal instead of a confusing 404. Do not re-enable without authentication.
app.delete("/api/blogs/:id", (req, res) => {
    return res.status(405).json({
        success: false,
        message: "Deleting posts through the API is disabled. Delete directly in the database.",
    });
});

// ════════════════════════════════════════════════════════════════════════════
// META & HEALTH
// ════════════════════════════════════════════════════════════════════════════

// ── GET /api/meta ─────────────────────────────────────────────────────────────
app.get("/api/meta", (req, res) => {
    const metaTags = {
        "/": {
            title: "Flying Star Aviator | Best Pilot Training Institute in India",
            description: "Join Flying Star Aviator — India's best DGCA-approved CPL & ATPL ground classes in Delhi. Start your pilot career today.",
        },
        "/about": {
            title: "About Us | Flying Star Aviator Private Limited",
            description: "Learn about Flying Star Aviator, Delhi's leading aviation training institute since 2008.",
        },
        "/blogs": {
            title: "Aviation Blogs | Flying Star Aviator",
            description: "Read the latest aviation news, DGCA updates, CPL guides and pilot career tips from Flying Star Aviator.",
        },
        "/contact": {
            title: "Contact Us | Flying Star Aviator",
            description: "Get in touch with Flying Star Aviator. Visit us in Dwarka, Delhi or call +91 9953536199.",
        },
        "/courses/cpl": {
            title: "CPL Ground Classes in Delhi | Flying Star Aviator",
            description: "Best DGCA CPL ground classes in Delhi. Air Navigation, Meteorology, Air Regulations & more. Enroll now.",
        },
        "/courses/atpl": {
            title: "ATPL Ground Training | Flying Star Aviator",
            description: "Airline Transport Pilot License ground training for pilots advancing their aviation career.",
        },
        "/courses/cabin-crew": {
            title: "Cabin Crew Course | Flying Star Aviator",
            description: "Professional cabin crew training program. Start your airline career with Flying Star Aviator.",
        },
        "/courses/ground-staff": {
            title: "Ground Staff Course | Flying Star Aviator",
            description: "Aviation ground staff training for a rewarding career at airports across India.",
        },
        "/pilot-training": {
            title: "Pilot Training | Flying Star Aviator",
            description: "Complete pilot training guidance for India, USA, Australia, New Zealand & South Africa.",
        },
        "/pilot-training/india": {
            title: "Pilot Training in India | Flying Star Aviator",
            description: "Guide to becoming a commercial pilot in India with DGCA-approved flight training.",
        },
        "/pilot-training/usa": {
            title: "Pilot Training in USA | Flying Star Aviator",
            description: "Complete guide to pilot training in the USA for Indian students. FAA approved programs.",
        },
        "/pilot-training/australia": {
            title: "Pilot Training in Australia | Flying Star Aviator",
            description: "Explore CASA-approved pilot training programs in Australia for aspiring commercial pilots.",
        },
        "/pilot-training/new-zealand": {
            title: "Pilot Training in New Zealand | Flying Star Aviator",
            description: "Pilot training options in New Zealand for Indian students seeking an international aviation career.",
        },
        "/pilot-training/south-africa": {
            title: "Pilot Training in South Africa | Flying Star Aviator",
            description: "Affordable pilot training in South Africa. Explore options with Flying Star Aviator.",
        },
        "/dgca": {
            title: "DGCA Exam Preparation | Flying Star Aviator",
            description: "Crack your DGCA exams with Flying Star Aviator's expert-led ground classes in Delhi.",
        },
        "/dgca/ground-classes": {
            title: "DGCA Ground Classes in Delhi | Flying Star Aviator",
            description: "Top DGCA CPL & ATPL ground classes in Dwarka, Delhi. Expert faculty, high pass rates.",
        },
        "/dgca/medical": {
            title: "DGCA Medical Requirements | Flying Star Aviator",
            description: "Complete guide to DGCA Class 1 & Class 2 medical requirements for pilot license in India.",
        },
        "/become-a-pilot/become-pilot": {
            title: "How to Become a Pilot in India | Flying Star Aviator",
            description: "Step-by-step guide to becoming a commercial pilot in India after 12th. Eligibility, fees & process.",
        },
        "/become-a-pilot/commercial-pilot-licence": {
            title: "Commercial Pilot Licence (CPL) | Flying Star Aviator",
            description: "Everything you need to know about getting a CPL in India. Training, exams, cost & career scope.",
        },
        "/become-a-pilot/airline-transport-pilot-licence": {
            title: "Airline Transport Pilot Licence (ATPL) | Flying Star Aviator",
            description: "Guide to obtaining an ATPL in India. Requirements, training and career opportunities.",
        },
        "/services": {
            title: "Aviation Services | Flying Star Aviator",
            description: "Flying Star Aviator offers charter services, aircraft management, MRO, CAMO and more.",
        },
        "/locations": {
            title: "Our Locations | Flying Star Aviator",
            description: "Find Flying Star Aviator training centers and offices across India.",
        },
        "/rtr": {
            title: "RTR(A) Training | Flying Star Aviator",
            description: "Radio Telephony Restricted (Aeronautical) exam preparation with Flying Star Aviator.",
        },
    };

    const pagePath = req.query.path || "/";
    const meta = metaTags[pagePath] || {
        title: "Flying Star Aviator | Best Pilot Training in India",
        description: "Flying Star Aviator — DGCA-approved CPL & ATPL ground classes in Delhi since 2008.",
    };

    res.json(meta);
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.send("🚀 Flying Star Aviator API is running"));

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);

    // Keep Render backend alive — ping every 14 minutes
    setInterval(() => {
        https.get("https://fly-star-aviation-private-limited.onrender.com/", () => {
            console.log("✅ Keep-alive ping sent");
        }).on("error", () => {
            console.log("⚠️ Keep-alive ping failed");
        });
    }, 14 * 60 * 1000);
});