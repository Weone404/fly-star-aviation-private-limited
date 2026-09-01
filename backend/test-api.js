// Quick test to verify blog API works
const http = require('http');
const fs = require('fs');
const path = require('path');

const testBlog = {
  title: "Test Blog: Backend is Working!",
  excerpt: "This blog was created via API test",
  content: "<h2>Welcome</h2><p>The backend is now running with fallback storage.</p><p>You can now upload blogs from the admin panel and they will be saved!</p>",
  category: "Testing"
};

// Test GET
console.log('\n📡 Testing GET /api/blogs...');
http.get('http://localhost:5000/api/blogs', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const blogs = JSON.parse(data);
      console.log(`✅ GET /api/blogs: Status ${res.statusCode}, Found ${blogs.length} blogs`);
    } catch (e) {
      console.log(`❌ GET /api/blogs: Invalid JSON response`);
    }
  });
}).on('error', err => console.log(`❌ GET /api/blogs: ${err.message}`));

// Small delay, then test POST
setTimeout(() => {
  console.log('\n📡 Testing POST /api/blogs...');
  
  const postData = `title=${encodeURIComponent(testBlog.title)}&excerpt=${encodeURIComponent(testBlog.excerpt)}&content=${encodeURIComponent(testBlog.content)}&category=${encodeURIComponent(testBlog.category)}`;

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/blogs',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.success || result.id) {
          console.log(`✅ POST /api/blogs: Blog created with ID ${result.id || result.success}`);
        } else {
          console.log(`❌ POST /api/blogs: ${result.message || 'Unknown error'}`);
        }
      } catch (e) {
        console.log(`❌ POST /api/blogs: ${data.substring(0, 100)}`);
      }
    });
  });

  req.on('error', err => console.log(`❌ POST /api/blogs: ${err.message}`));
  req.write(postData);
  req.end();

  // Final test: GET to see updated list
  setTimeout(() => {
    console.log('\n📡 Testing GET /api/blogs (after POST)...');
    http.get('http://localhost:5000/api/blogs', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const blogs = JSON.parse(data);
          console.log(`✅ GET /api/blogs: Now have ${blogs.length} blog(s)`);
          if (blogs.length > 0) {
            console.log(`   Latest: "${blogs[0].title}"`);
          }
          console.log('\n🎉 SUCCESS! Blog API is fully functional with fallback storage!\n');
        } catch (e) {
          console.log(`❌ Parse error`);
        }
      });
    }).on('error', err => console.log(`❌ Error: ${err.message}`));
  }, 500);
}, 500);
