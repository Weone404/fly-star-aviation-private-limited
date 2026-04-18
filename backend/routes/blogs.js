// backend/routes/blogs.js
//
// ── How to wire this into your server.js ─────────────────────────────────────
//
//   const blogRoutes = require('./routes/blogs')
//   app.use('/api/blogs', blogRoutes)
//
// ─────────────────────────────────────────────────────────────────────────────

const express = require('express')
const router = express.Router()
const multer = require('multer')
const { v2: cloudinary } = require('cloudinary')
const Blog = require('../models/Blog')   // ← your existing Mongoose Blog model

// ── Cloudinary (reads from your existing backend/.env) ───────────────────────
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ── Multer – memory storage so we can stream directly to Cloudinary ───────────
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },   // 5 MB
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true)
        else cb(new Error('Only image files are allowed'))
    },
})

// ── Helper: stream a buffer to Cloudinary ────────────────────────────────────
function uploadBuffer(buffer, folder) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder }, (err, result) => {
            if (err) reject(err)
            else resolve(result.secure_url)
        }).end(buffer)
    })
}

// ── GET /api/blogs  — list all (newest first) ────────────────────────────────
router.get('/', async (_req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean()
        res.json(blogs)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// ── GET /api/blogs/:id  — single blog (for BlogDetail page) ─────────────────
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).lean()
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found.' })
        res.json(blog)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// ── POST /api/blogs  — create new blog ───────────────────────────────────────
router.post('/', upload.single('coverImage'), async (req, res) => {
    try {
        const { title, excerpt, content, category } = req.body

        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'Title and content are required.' })
        }

        let coverImage = ''
        if (req.file) {
            coverImage = await uploadBuffer(req.file.buffer, 'flystar/blogs')
        }

        const blog = await Blog.create({ title, excerpt, content, category, coverImage })
        res.status(201).json({ success: true, blog })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// ── PUT /api/blogs/:id  — update existing blog ───────────────────────────────
router.put('/:id', upload.single('coverImage'), async (req, res) => {
    try {
        const { title, excerpt, content, category } = req.body

        const update = { title, excerpt, content, category, updatedAt: new Date() }

        // Only replace image if a new one was uploaded; keep old one otherwise
        if (req.file) {
            update.coverImage = await uploadBuffer(req.file.buffer, 'flystar/blogs')
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: update },
            { new: true }
        )

        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found.' })
        res.json({ success: true, blog })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// ── DELETE /api/blogs/:id  — delete blog ─────────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found.' })
        res.json({ success: true, message: 'Blog deleted.' })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

module.exports = router