const Contact = require('../models/Contact');

const contacts = [
    {
        name: 'Emma Thompson',
        email: 'emma.t@example.com',
        phoneNumber: '+234567890129',
        subject: 'Course Inquiry',
        message: 'I would like to know more about the Python backend development course.',
        status: 'pending'
    },
    {
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        phoneNumber: '+234567890130',
        subject: 'Partner Inquiry',
        message: 'Our company is interested in partnering with Tecvinson Academy.',
        status: 'responded'
    },
    {
        name: 'Maria Garcia',
        email: 'maria.g@example.com',
        phoneNumber: '+234567890131',
        subject: 'Technical Support',
        message: 'I am having trouble accessing the course materials.',
        status: 'closed'
    }
];

const seedContacts = async () => {
    try {
        // Clear existing contacts
        await Contact.deleteMany({});
        
        // Create new contacts
        await Contact.insertMany(contacts);
        console.log('Contacts seeded successfully');
    } catch (error) {
        console.error('Error seeding contacts:', error);
        throw error;
    }
};

module.exports = seedContacts;
