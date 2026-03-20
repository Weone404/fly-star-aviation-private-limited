const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" }); // ✅ always loads backend/.env

const Contact = require("./models/Contact");

const app = express();

// ── Middleware ──
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:8080"] }));
app.use(express.json());

// ── Connect to MongoDB Atlas ──
mongoose
    .connect(process.env.MONGODB_URI) // ✅ matches your .env key
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ── POST /api/contact ──
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, phone, interest, message } = req.body;

        // Basic validation
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

// ── GET /api/contacts (optional: view all submissions) ──
app.get("/api/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ── Health check ──
app.get("/", (req, res) => res.send("🚀 Flying Star Aviator API is running"));

// ── Start Server ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));