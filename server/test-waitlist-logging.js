// Test script to verify waitlist submission with comprehensive error logging
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data for waitlist submission
const testWaitlistData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phoneNumber: '+1234567890',
    course: 'Frontend Development',
    country: 'Nigeria',
    timeZone: 'Africa/Lagos',
    reason: 'I want to learn web development',
    preferredCohort: '507f1f77bcf86cd799439011' // Dummy ObjectId
};

const testIncompleteData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com'
    // Missing required fields intentionally
};

async function testWaitlistSubmission() {
    console.log('🧪 TESTING WAITLIST SUBMISSION WITH ENHANCED LOGGING');
    console.log('='.repeat(80));

    try {
        console.log('\n📊 Test 1: Submitting incomplete data (should fail)');
        console.log('Data:', JSON.stringify(testIncompleteData, null, 2));
        
        try {
            const response = await axios.post(`${BASE_URL}/waitlist`, testIncompleteData);
            console.log('❌ Test 1 failed - should have rejected incomplete data');
            console.log('Response:', response.data);
        } catch (error) {
            console.log('✅ Test 1 passed - correctly rejected incomplete data');
            console.log('Error status:', error.response?.status);
            console.log('Error message:', error.response?.data?.message);
        }

        console.log('\n📊 Test 2: Submitting complete data (should succeed or show specific error)');
        console.log('Data:', JSON.stringify(testWaitlistData, null, 2));
        
        try {
            const response = await axios.post(`${BASE_URL}/waitlist`, testWaitlistData);
            console.log('✅ Test 2 passed - waitlist submission successful');
            console.log('Response:', JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.log('❌ Test 2 revealed an issue:');
            console.log('Error status:', error.response?.status);
            console.log('Error message:', error.response?.data?.message);
            console.log('Full error data:', JSON.stringify(error.response?.data, null, 2));
            
            if (error.response?.status === 404) {
                console.log('💡 The cohort ID might not exist. This is expected if using dummy data.');
            }
        }

        console.log('\n📊 Test 3: Testing server connectivity');
        try {
            const response = await axios.get(`${BASE_URL.replace('/api', '')}/`);
            console.log('✅ Server is running and accessible');
            console.log('Response:', response.data);
        } catch (error) {
            console.log('❌ Server connectivity issue:');
            console.log('Error:', error.message);
        }

    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
    }

    console.log('\n' + '='.repeat(80));
    console.log('🔍 Check the following log files for detailed information:');
    console.log('- server/logs/error.log');
    console.log('- server/logs/app.log');
    console.log('- Browser console (F12)');
    console.log('='.repeat(80));
}

// Run the test
if (require.main === module) {
    testWaitlistSubmission();
}

module.exports = { testWaitlistSubmission };
