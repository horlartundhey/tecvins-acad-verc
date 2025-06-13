const mongoose = require('mongoose');
const config = require('../config/db');
const seedUsers = require('./userSeeder');
const seedStudentApplications = require('./studentApplicationSeeder');
const seedTrainerApplications = require('./trainerApplicationSeeder');
const seedContacts = require('./contactSeeder');
const seedBlogs = require('./blogSeeder');
const seedPartners = require('./partnerSeeder');
const seedNewsletters = require('./newsletterSeeder');

const runSeeders = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || config.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Run seeders in sequence
        console.log('Starting database seeding...');
        
        // 1. Seed users first (we need admin user ID for blogs)
        await seedUsers();
        
        // 2. Get admin user ID for blog posts
        const User = require('../models/User');
        const adminUser = await User.findOne({ role: 'admin' });
        
        if (!adminUser) {
            throw new Error('Admin user not found. User seeding may have failed.');
        }

        // 3. Seed other collections
        await seedBlogs(adminUser._id);
        await seedStudentApplications();
        await seedTrainerApplications();
        await seedContacts();
        await seedPartners();
        await seedNewsletters();

        console.log('Database seeding completed successfully!');
        
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run seeders
runSeeders();
