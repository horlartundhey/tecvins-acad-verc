const Newsletter = require('../models/Newsletter');

const newsletters = [
    {
        email: 'subscriber1@example.com',
        isSubscribed: true,
        subscribedAt: new Date('2024-01-15')
    },
    {
        email: 'subscriber2@example.com',
        isSubscribed: true,
        subscribedAt: new Date('2024-02-01')
    },
    {
        email: 'unsubscribed@example.com',
        isSubscribed: false,
        subscribedAt: new Date('2024-01-01')
    }
];

const seedNewsletters = async () => {
    try {
        // Clear existing subscriptions
        await Newsletter.deleteMany({});
        
        // Create new subscriptions
        await Newsletter.insertMany(newsletters);
        console.log('Newsletter subscriptions seeded successfully');
    } catch (error) {
        console.error('Error seeding newsletter subscriptions:', error);
        throw error;
    }
};

module.exports = seedNewsletters;
