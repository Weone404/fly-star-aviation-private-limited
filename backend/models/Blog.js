const mongoose = require("mongoose");

function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    content: { type: String, required: true },
    category: { type: String, default: "Blog" },
    coverImage: { type: String, default: "" },
    slug: { type: String, required: true, unique: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

blogSchema.pre("validate", function setSlug(next) {
    if (!this.slug && this.title) {
        this.slug = generateSlug(this.title);
    }
    next();
});

module.exports = mongoose.model("Blog", blogSchema);
