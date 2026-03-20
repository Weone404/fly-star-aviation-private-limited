import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Contact schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    interest: { type: String, default: "Not specified" },
    message: { type: String, default: "No additional message" },
    createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// DB connection
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    await connectDB();

    const { name, email, phone, interest, message } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, error: "Name, email and phone are required." });
    }

    const contact = new Contact({
        name, email, phone,
        interest: interest || "Not specified",
        message: message || "No additional message",
    });

    await contact.save();

    return res.status(201).json({ success: true, message: "Contact saved successfully!" });
}