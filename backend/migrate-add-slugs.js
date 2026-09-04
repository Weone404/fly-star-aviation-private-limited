#!/usr/bin/env node
/**
 * migrate-add-slugs.js
 * Adds slug field to existing blogs in blogs.json that don't have one
 * Run: node backend/migrate-add-slugs.js
 */

const fs = require('fs');
const path = require('path');

const BLOGS_FILE = path.join(__dirname, 'data', 'blogs.json');

function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function migrateSlugs() {
    try {
        if (!fs.existsSync(BLOGS_FILE)) {
            console.log('✓ No blogs.json file yet (first time setup)');
            return;
        }

        const data = JSON.parse(fs.readFileSync(BLOGS_FILE, 'utf8'));
        let updated = 0;

        const blogs = data.map(blog => {
            if (!blog.slug && blog.title) {
                blog.slug = generateSlug(blog.title);
                updated++;
            }
            return blog;
        });

        fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf8');
        console.log(`✅ Migration complete: ${updated} blogs updated with slugs`);
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        process.exit(1);
    }
}

migrateSlugs();
