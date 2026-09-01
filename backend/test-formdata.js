// Test admin panel FormData upload (how it really works)
const http = require('http');
const FormData = require('form-data');
const fs = require('fs');

// Create a test image buffer
const testImageBuffer = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

const form = new FormData();
form.append('title', 'Admin Panel Test Blog');
form.append('excerpt', 'Testing admin panel upload');
form.append('content', '<h2>Admin Test</h2><p>Blog uploaded from admin panel via FormData</p>');
form.append('category', 'Admin Test');
form.append('coverImage', testImageBuffer, 'test.png');

console.log('\n📡 Testing admin panel FormData upload...\n');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/blogs',
  method: 'POST',
  headers: form.getHeaders(),
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log(`✅ FormData POST /api/blogs: Status ${res.statusCode}`);
      console.log(`   Response:`, result);
      
      if (result.id || result.success) {
        // Test GET to verify it was saved
        setTimeout(() => {
          http.get('http://localhost:5000/api/blogs', (getRes) => {
            let blogs = '';
            getRes.on('data', chunk => blogs += chunk);
            getRes.on('end', () => {
              const list = JSON.parse(blogs);
              const uploadedBlog = list.find(b => b.title === 'Admin Panel Test Blog');
              if (uploadedBlog) {
                console.log(`\n✅ Blog verified in database!`);
                console.log(`   Title: "${uploadedBlog.title}"`);
                console.log(`   Created: ${uploadedBlog.createdAt}`);
              }
            });
          });
        }, 300);
      }
    } catch (e) {
      console.log(`❌ FormData POST /api/blogs: Invalid response`);
      console.log(`   ${data.substring(0, 200)}`);
    }
  });
});

req.on('error', err => console.log(`❌ Error: ${err.message}`));
form.pipe(req);
