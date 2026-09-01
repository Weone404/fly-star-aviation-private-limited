// ════════════════════════════════════════════════════════════════════════════
// blogStore.js — File-based fallback when MongoDB is unavailable
// ════════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const BLOGS_FILE = path.join(__dirname, 'data', 'blogs.json');

// Ensure data directory exists
function ensureDataDir() {
    const dir = path.dirname(BLOGS_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Load all blogs from file
function loadBlogs() {
    ensureDataDir();
    try {
        if (fs.existsSync(BLOGS_FILE)) {
            const data = fs.readFileSync(BLOGS_FILE, 'utf8');
            return JSON.parse(data) || [];
        }
    } catch (err) {
        console.error('❌ Error reading blogs file:', err.message);
    }
    return [];
}

// Save blogs to file
function saveBlogs(blogs) {
    ensureDataDir();
    try {
        fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('❌ Error saving blogs file:', err.message);
        return false;
    }
}

// Get all blogs
function getAllBlogs() {
    return loadBlogs().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Get single blog by ID
function getBlogById(id) {
    const blogs = loadBlogs();
    return blogs.find(b => b._id === id) || null;
}

// Create new blog
function createBlog(data) {
    const blogs = loadBlogs();
    const newBlog = {
        _id: uuidv4(),
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content,
        category: data.category || 'Blog',
        coverImage: data.coverImage || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    blogs.push(newBlog);
    saveBlogs(blogs);
    return newBlog;
}

// Update existing blog
function updateBlog(id, data) {
    const blogs = loadBlogs();
    const index = blogs.findIndex(b => b._id === id);
    if (index === -1) return null;

    blogs[index] = {
        ...blogs[index],
        title: data.title || blogs[index].title,
        excerpt: data.excerpt !== undefined ? data.excerpt : blogs[index].excerpt,
        content: data.content || blogs[index].content,
        category: data.category || blogs[index].category,
        coverImage: data.coverImage || blogs[index].coverImage,
        updatedAt: new Date().toISOString(),
    };
    saveBlogs(blogs);
    return blogs[index];
}

// Delete blog
function deleteBlog(id) {
    const blogs = loadBlogs();
    const index = blogs.findIndex(b => b._id === id);
    if (index === -1) return false;

    blogs.splice(index, 1);
    saveBlogs(blogs);
    return true;
}

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    loadBlogs,
    saveBlogs,
};
