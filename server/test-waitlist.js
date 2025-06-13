const axios = require('axios');

async function testWaitlistAPI() {
    const baseURL = 'http://localhost:5000/api';
    
    try {
        console.log('Testing waitlist API...\n');
        
        // First, let's get available cohorts
        console.log('1. Getting available cohorts...');
        try {
            const cohortsResponse = await axios.get(`${baseURL}/cohorts`);
            console.log('Cohorts response status:', cohortsResponse.status);
            console.log('Cohorts data:', JSON.stringify(cohortsResponse.data, null, 2));
            
            // Use the first cohort if available, otherwise create a dummy ObjectId
            let cohortId = '507f1f77bcf86cd799439011'; // Default ObjectId
            if (cohortsResponse.data && cohortsResponse.data.length > 0) {
                cohortId = cohortsResponse.data[0]._id;
                console.log('Using cohort ID:', cohortId);
            } else {
                console.log('No cohorts found, using dummy ID:', cohortId);
            }
            
            // Now test waitlist submission
            console.log('\n2. Testing waitlist submission...');
            const waitlistData = {
                firstName: 'Test',
                lastName: 'User',
                email: 'testuser@example.com',
                phoneNumber: '+1234567890',
                course: 'DevOps Engineering',
                country: 'Nigeria',
                timeZone: 'WAT',
                reason: 'I want to learn DevOps engineering',
                preferredCohort: cohortId
            };
            
            console.log('Submitting waitlist data:', JSON.stringify(waitlistData, null, 2));
            
            const waitlistResponse = await axios.post(`${baseURL}/waitlist`, waitlistData);
            console.log('Waitlist response status:', waitlistResponse.status);
            console.log('Waitlist response:', JSON.stringify(waitlistResponse.data, null, 2));
            
        } catch (cohortsError) {
            console.log('Cohorts API error:', cohortsError.response?.status, cohortsError.response?.data || cohortsError.message);
            
            // Still try waitlist with dummy ID
            console.log('\n2. Testing waitlist submission with dummy cohort ID...');
            const waitlistData = {
                firstName: 'Test',
                lastName: 'User',
                email: 'testuser@example.com',
                phoneNumber: '+1234567890',
                course: 'DevOps Engineering',
                country: 'Nigeria',
                timeZone: 'WAT',
                reason: 'I want to learn DevOps engineering',
                preferredCohort: '507f1f77bcf86cd799439011'
            };
            
            const waitlistResponse = await axios.post(`${baseURL}/waitlist`, waitlistData);
            console.log('Waitlist response status:', waitlistResponse.status);
            console.log('Waitlist response:', JSON.stringify(waitlistResponse.data, null, 2));
        }
        
    } catch (error) {
        console.error('Error details:');
        console.error('Status:', error.response?.status);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
        console.error('Message:', error.message);
    }
}

testWaitlistAPI();
