const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const https = require("https");
const { formidable } = require('formidable');
const cloudinary = require("cloudinary").v2;
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config({ path: __dirname + "/.env" });

const Contact = require("./models/Contact");

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// ── MongoDB Native Client (for blogs) ─────────────────────────────────────────
const mongoClient = new MongoClient(process.env.MONGODB_URI);

let db;
mongoClient.connect()
    .then(() => {
        db = mongoClient.db("flystarDB");   // ✅ flystar database — separate from WeOne
        console.log("✅ MongoDB Native Client Connected → flystar DB");
    })
    .catch(err => console.error("❌ MongoDB Native Client Error:", err));

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
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                error: "Name, email, and phone are required.",
            });
        }
        const newContact = new Contact({
            name,
            email,
            phone,
            interest: interest || "Not specified",
            message: message || "No additional message",
        });
        await newContact.save();
        res.status(201).json({ success: true, message: "Contact saved successfully!" });
    } catch (err) {
        console.error("Save error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ── GET /api/contacts ─────────────────────────────────────────────────────────
app.get("/api/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ════════════════════════════════════════════════════════════════════════════
// BLOG ROUTES — all stored in flystar DB → blogs collection
// ════════════════════════════════════════════════════════════════════════════

// ── GET /api/blogs — fetch all blogs ─────────────────────────────────────────
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray();
        const serialized = blogs.map(b => ({
            ...b,
            _id: b._id.toString(),
            createdAt: b.createdAt ? b.createdAt.toString() : new Date().toString(),
        }));
        return res.status(200).json(serialized);
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
});

// ── GET /api/blogs/:id — fetch single blog ────────────────────────────────────
app.get("/api/blogs/:id", async (req, res) => {
    try {
        const blog = await db.collection("blogs").findOne({ _id: new ObjectId(req.params.id) });
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
        return res.status(200).json({
            ...blog,
            _id: blog._id.toString(),
            createdAt: blog.createdAt ? blog.createdAt.toString() : new Date().toString(),
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
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
                return res.status(500).json({ success: false, message: `Image upload failed: ${uploadErr.message}` });
            }
        }

        const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

        try {
            const result = await db.collection("blogs").insertOne({
                title,
                excerpt: excerpt || "",
                content,
                coverImage,
                category: category || "Blog",
                slug,
                createdAt: new Date(),
            });
            return res.status(200).json({ success: true, id: result.insertedId.toString() });
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
                return res.status(500).json({ success: false, message: `Image upload failed: ${uploadErr.message}` });
            }
        }

        try {
            const result = await db.collection("blogs").updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: update }
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({ success: false, message: "Blog not found" });
            }
            return res.status(200).json({ success: true, message: "Blog updated" });
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    });
});

// ── DELETE /api/blogs/:id — delete blog ──────────────────────────────────────
app.delete("/api/blogs/:id", async (req, res) => {
    try {
        const result = await db.collection("blogs").deleteOne({
            _id: new ObjectId(req.params.id)
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        return res.status(200).json({ success: true, message: "Blog deleted" });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
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