// Simple test script to verify the API is working
// Run this with: node test-api.js (make sure server is running first)

const https = require('http');

const baseURL = 'http://localhost:3000';

// Test data
const testContact = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test.user@example.com',
  favoriteColor: 'Purple',
  birthday: '1995-03-20'
};

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPI() {
  console.log('🚀 Testing Contacts API...\n');

  try {
    // Test 1: Get all contacts (should be empty initially)
    console.log('1. Testing GET /contacts');
    const getAll = await makeRequest('GET', '/contacts');
    console.log(`   Status: ${getAll.status}`);
    console.log(`   Response: ${JSON.stringify(getAll.data, null, 2)}\n`);

    // Test 2: Create a new contact
    console.log('2. Testing POST /contacts');
    const create = await makeRequest('POST', '/contacts', testContact);
    console.log(`   Status: ${create.status}`);
    console.log(`   Response: ${JSON.stringify(create.data, null, 2)}\n`);

    if (create.status === 201 && create.data.success) {
      const contactId = create.data.data._id;

      // Test 3: Get the specific contact
      console.log('3. Testing GET /contacts/:id');
      const getOne = await makeRequest('GET', `/contacts/${contactId}`);
      console.log(`   Status: ${getOne.status}`);
      console.log(`   Response: ${JSON.stringify(getOne.data, null, 2)}\n`);

      // Test 4: Update the contact
      console.log('4. Testing PUT /contacts/:id');
      const updatedData = { ...testContact, favoriteColor: 'Orange' };
      const update = await makeRequest('PUT', `/contacts/${contactId}`, updatedData);
      console.log(`   Status: ${update.status}`);
      console.log(`   Response: ${JSON.stringify(update.data, null, 2)}\n`);

      // Test 5: Delete the contact
      console.log('5. Testing DELETE /contacts/:id');
      const deleteContact = await makeRequest('DELETE', `/contacts/${contactId}`);
      console.log(`   Status: ${deleteContact.status}`);
      console.log(`   Response: ${JSON.stringify(deleteContact.data, null, 2)}\n`);
    }

    // Test 6: Test error handling (invalid ID)
    console.log('6. Testing error handling (invalid ID)');
    const invalidId = await makeRequest('GET', '/contacts/invalid-id');
    console.log(`   Status: ${invalidId.status}`);
    console.log(`   Response: ${JSON.stringify(invalidId.data, null, 2)}\n`);

    console.log('✅ API testing completed!');
    console.log('\n📚 Visit http://localhost:3000/api-docs for interactive documentation');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('\n💡 Make sure the server is running: npm run dev');
  }
}

// Run tests
testAPI();