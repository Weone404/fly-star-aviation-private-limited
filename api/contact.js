import { createHash } from "node:crypto";
import { isIP } from "node:net";
import mongoose from "mongoose";
import { getMongoUri } from "./lib/mongoUri.js";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_COLLECTION = "contact_rate_limits";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, maxlength: 254 },
    phone: { type: String, required: true, maxlength: 32 },
    interest: { type: String, default: "Not specified", maxlength: 100 },
    message: { type: String, default: "No additional message", maxlength: 2000 },
    createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

let isConnected = false;
let rateLimitIndexPromise;

async function connectDB(mongoUri) {
    if (!isConnected) {
        await mongoose.connect(mongoUri);
        isConnected = true;
    }
}

function getClientIp(req) {
    const forwarded = req.headers?.["x-forwarded-for"];
    const rawIp = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim();
    return rawIp && isIP(rawIp) ? rawIp : null;
}

async function consumeContactAttempt(ip) {
    const collection = mongoose.connection.db?.collection(RATE_LIMIT_COLLECTION);
    if (!collection) throw new Error("Contact rate-limit database is unavailable.");

    if (!rateLimitIndexPromise) {
        rateLimitIndexPromise = collection.createIndex(
            { windowStartedAt: 1 },
            { expireAfterSeconds: RATE_LIMIT_WINDOW_MS / 1000, name: "contact_rate_limits_ttl" }
        ).catch((error) => {
            rateLimitIndexPromise = undefined;
            throw error;
        });
    }
    await rateLimitIndexPromise;

    const now = new Date();
    const windowExpiredAt = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);
    const key = createHash("sha256").update(ip).digest("hex");
    const result = await collection.findOneAndUpdate(
        { _id: key },
        [{
            $set: {
                windowStartedAt: {
                    $cond: [
                        { $lte: [{ $ifNull: ["$windowStartedAt", new Date(0)] }, windowExpiredAt] },
                        now,
                        { $ifNull: ["$windowStartedAt", now] },
                    ],
                },
                attempts: {
                    $cond: [
                        { $lte: [{ $ifNull: ["$windowStartedAt", new Date(0)] }, windowExpiredAt] },
                        1,
                        { $add: [{ $ifNull: ["$attempts", 0] }, 1] },
                    ],
                },
            },
        }],
        { upsert: true, returnDocument: "after" }
    );
    const record = result?.value ?? result;
    const retryAfterSeconds = Math.max(
        1,
        Math.ceil((new Date(record.windowStartedAt).getTime() + RATE_LIMIT_WINDOW_MS - now.getTime()) / 1000)
    );
    return { allowed: record.attempts <= RATE_LIMIT_MAX, retryAfterSeconds };
}

function validateContactBody(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return { error: "A valid contact form submission is required." };
    }

    if (body.company !== undefined && (typeof body.company !== "string" || body.company.length > 200)) {
        return { error: "A valid contact form submission is required." };
    }
    if (typeof body.company === "string" && body.company.trim()) {
        return { honeypot: true };
    }

    const fields = ["name", "email", "phone", "interest", "message"];
    if (fields.some((field) => body[field] !== undefined && typeof body[field] !== "string")) {
        return { error: "Contact details must be text." };
    }

    const contact = {
        name: body.name?.trim() || "",
        email: body.email?.trim() || "",
        phone: body.phone?.trim() || "",
        interest: body.interest?.trim() || "Not specified",
        message: body.message?.trim() || "No additional message",
    };
    if (!contact.name || contact.name.length > 100) {
        return { error: "Name is required and must be at most 100 characters." };
    }
    if (
        !contact.email ||
        contact.email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    ) {
        return { error: "Enter a valid email address of at most 254 characters." };
    }
    if (
        contact.phone.length > 32 ||
        !/^\+?[\d\s().-]{7,32}$/.test(contact.phone) ||
        contact.phone.replace(/\D/g, "").length < 7
    ) {
        return { error: "Enter a valid phone number of at most 32 characters." };
    }
    if (contact.interest.length > 100) {
        return { error: "Interest must be at most 100 characters." };
    }
    if (contact.message.length > 2000) {
        return { error: "Message must be at most 2000 characters." };
    }
    return { contact };
}

export function createContactHandler({
    getUri = getMongoUri,
    connect = connectDB,
    consumeAttempt = consumeContactAttempt,
    save = (contact) => Contact.create(contact),
} = {}) {
    return async function handler(req, res) {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const ip = getClientIp(req);
        if (!ip) {
            return res.status(503).json({ error: "Request protection is temporarily unavailable." });
        }

        const mongoUri = getUri();
        if (!mongoUri) {
            return res.status(503).json({ error: "Database is not configured for this deployment." });
        }
        try {
            await connect(mongoUri);
        } catch (error) {
            console.error("[contact] database unavailable:", error?.name || "Error");
            return res.status(503).json({ error: "Database is temporarily unavailable." });
        }

        let rateLimit;
        try {
            rateLimit = await consumeAttempt(ip);
        } catch (error) {
            console.error("[contact] rate limiter unavailable:", error?.name || "Error");
            return res.status(503).json({ error: "Request protection is temporarily unavailable." });
        }
        if (!rateLimit.allowed) {
            res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
            return res.status(429).json({ success: false, error: "Too many submissions. Please try again later." });
        }

        const parsed = validateContactBody(req.body);
        if (parsed.error) {
            return res.status(400).json({ success: false, error: parsed.error });
        }
        if (parsed.honeypot) {
            return res.status(201).json({ success: true, message: "Contact saved successfully!" });
        }

        try {
            await save(parsed.contact);
        } catch (error) {
            console.error("[contact] save failed:", error?.name || "Error");
            return res.status(503).json({ error: "Your submission could not be saved. Please try again later." });
        }

        return res.status(201).json({ success: true, message: "Contact saved successfully!" });
    };
}

export default createContactHandler();
