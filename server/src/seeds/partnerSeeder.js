const Partner = require('../models/Partner');

const partners = [
    {
        type: 'corporate',
        email: 'contact@techcorp.com',
        phoneNumber: '+234567890132',
        country: 'Nigeria',
        companyName: 'TechCorp Solutions',
        position: 'HR Manager',
        companySize: '100-500',
        website: 'https://techcorp.com',
        industryType: 'Technology',
        partnershipInterest: ['recruitment', 'mentorship', 'internship'],
        additionalInfo: 'Looking to hire graduates and provide internship opportunities',
        status: 'approved'
    },
    {
        type: 'individual',
        email: 'james.wilson@example.com',
        phoneNumber: '+234567890133',
        country: 'Nigeria',
        firstName: 'James',
        lastName: 'Wilson',
        profession: 'Senior Software Engineer',
        linkedIn: 'https://linkedin.com/in/jameswilson',
        partnershipInterest: ['mentorship', 'training'],
        additionalInfo: 'Interested in mentoring students and conducting workshops',
        status: 'pending'
    },
    {
        type: 'corporate',
        email: 'partnerships@edutech.com',
        phoneNumber: '+234567890134',
        country: 'Nigeria',
        companyName: 'EduTech Innovation',
        position: 'Partnership Director',
        companySize: '10-50',
        website: 'https://edutech.com',
        industryType: 'Education Technology',
        partnershipInterest: ['software', 'funding', 'training'],
        additionalInfo: 'Interested in providing educational software and funding support',
        status: 'pending'
    }
];

const seedPartners = async () => {
    try {
        // Clear existing partners
        await Partner.deleteMany({});
        
        // Create new partners
        await Partner.insertMany(partners);
        console.log('Partners seeded successfully');
    } catch (error) {
        console.error('Error seeding partners:', error);
        throw error;
    }
};

module.exports = seedPartners;
