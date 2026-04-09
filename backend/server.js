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

const mongoClient = new MongoClient(process.env.MONGODB_URI);

// ── Connect MongoDB Native Client once at startup ──
let db;
mongoClient.connect()
    .then(() => {
        db = mongoClient.db("weoneaviation");
        console.log("✅ MongoDB Native Client Connected");
    })
    .catch(err => console.error("❌ MongoDB Native Client Error:", err));

// ── Middleware ──
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:8080",
        "https://www.flystar.co.in",
        "https://flystar.co.in",
        "https://fly-star-aviation-private-limited.onrender.com",
    ]
}));
app.use(express.json());

// ── Connect Mongoose ──
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ── POST /api/contact ──
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

// ── GET /api/contacts ──
app.get("/api/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ── GET /api/blogs ──
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray();
        const serialized = blogs.map(b => ({
            ...b,
            _id: b._id.toString(),
            createdAt: b.createdAt.toString()
        }));
        return res.status(200).json(serialized);
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
});

// ── GET /api/blogs/:id ──
app.get("/api/blogs/:id", async (req, res) => {
    try {
        const blog = await db.collection("blogs").findOne({ _id: new ObjectId(req.params.id) });
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
        return res.status(200).json({
            ...blog,
            _id: blog._id.toString(),
            createdAt: blog.createdAt.toString()
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
});

// ── POST /api/blogs ──
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
                    folder: "weoneaviation/blogs",
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

// ── Health check ──
app.get("/", (req, res) => res.send("🚀 Flying Star Aviator API is running"));

// ── Start Server ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
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