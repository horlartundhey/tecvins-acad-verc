const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const config = require('../config/db');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');
const Partner = require('../models/Partner');
const StudentApplication = require('../models/StudentApplication');
const TrainerApplication = require('../models/TrainerApplication');

// Seed data for Users
const users = [
    {
        name: 'Admin User',
        email: 'admin@tecvinson.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        name: 'Content Manager',
        email: 'content@tecvinson.com',
        password: 'content123',
        role: 'editor'
    },
    {
        name: 'Course Editor',
        email: 'courses@tecvinson.com',
        password: 'courses123',
        role: 'editor'
    },
    {
        name: 'Content Creator',
        email: 'creator@tecvinson.com',
        password: 'creator123',
        role: 'editor'
    }
];

// Seed data for Student Applications
const studentApplications = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+234567890123',
        dateOfBirth: '1995-05-15',
        gender: 'male',
        course: 'Backend Software Development in PYTHON',
        education: 'Bachelor in Computer Science',
        currentOccupation: 'Junior Developer',
        address: '123 Tech Street, Lagos',
        country: 'Nigeria',
        timeZone: 'WAT',
        year: '2025',
        cohort: 'Spring 2025',
        reason: 'To advance my career in software development',
        status: 'pending'
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '+234567890124',
        dateOfBirth: '1998-08-20',
        gender: 'female',
        course: 'Frontend Software Development(ReactJS)',
        education: 'Bachelor in Information Technology',
        currentOccupation: 'UI Designer',
        address: '456 Digital Avenue, Abuja',
        country: 'Nigeria',
        timeZone: 'WAT',
        year: '2025',
        cohort: 'Spring 2025',
        reason: 'To transition into frontend development',
        status: 'approved'
    }
];

// Seed data for Trainer Applications
const trainerApplications = [
    {
        fullName: 'David Wilson',
        email: 'david.wilson@example.com',
        phoneNumber: '+234567890126',
        expertise: ['Python', 'Django', 'Data Science'],
        yearsOfExperience: 5,
        resume: 'https://example.com/resumes/david-wilson.pdf',
        portfolio: 'https://github.com/davidwilson',
        linkedIn: 'https://linkedin.com/in/davidwilson',
        preferredCourses: ['Backend Software Development in PYTHON', 'Data Analysis + Data Scientist'],
        availability: 'Weekends',
        status: 'pending'
    },
    {
        fullName: 'Sarah Martinez',
        email: 'sarah.m@example.com',
        phoneNumber: '+234567890127',
        expertise: ['React', 'Vue', 'JavaScript'],
        yearsOfExperience: 4,
        resume: 'https://example.com/resumes/sarah-martinez.pdf',
        portfolio: 'https://github.com/sarahm',
        linkedIn: 'https://linkedin.com/in/sarahm',
        preferredCourses: ['Frontend Software Development(ReactJS)'],
        availability: 'Evenings',
        status: 'approved'
    }
];

// Seed data for Contacts
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
    }
];

// Seed data for Partners
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
    }
];

// Seed data for Newsletter subscriptions
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
    }
];

// Main seeding function
const seedDatabase = async () => {
    try {        // Load environment variables
        dotenv.config();
        
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        const mongoURI = process.env.MONGO_URI || config.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MongoDB connection URI is not defined. Please check your .env file or config.');
        }
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully');

        // Clear all collections
        console.log('Clearing existing data...');
        await Promise.all([
            User.deleteMany({}),
            Blog.deleteMany({}),
            Contact.deleteMany({}),
            Newsletter.deleteMany({}),
            Partner.deleteMany({}),
            StudentApplication.deleteMany({}),
            TrainerApplication.deleteMany({})
        ]);

        // Seed Users first (we need admin user for blogs)
        console.log('Seeding users...');
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            return user;
        }));
        const createdUsers = await User.insertMany(hashedUsers);
        
        // Get admin user for blog posts
        const adminUser = createdUsers.find(user => user.role === 'admin');

        // Seed Blogs with admin user as author
        console.log('Seeding blogs...');
        const blogs = [
            {
                title: 'Getting Started with Python Programming',
                content: 'Python is one of the most popular programming languages...',
                author: adminUser._id,
                featuredImage: 'https://example.com/images/python-intro.jpg',
                tags: ['Python', 'Programming', 'Beginners'],
                status: 'published',
                slug: 'getting-started-with-python-programming'
            },
            {
                title: 'The Journey to Becoming a Full Stack Developer',
                content: 'Full stack development is an exciting career path...',
                author: adminUser._id,
                featuredImage: 'https://example.com/images/fullstack.jpg',
                tags: ['Web Development', 'Career', 'Full Stack'],
                status: 'published',
                slug: 'journey-to-becoming-full-stack-developer'
            }
        ];
        await Blog.insertMany(blogs);

        // Seed other collections
        console.log('Seeding student applications...');
        await StudentApplication.insertMany(studentApplications);

        console.log('Seeding trainer applications...');
        await TrainerApplication.insertMany(trainerApplications);

        console.log('Seeding contacts...');
        await Contact.insertMany(contacts);

        console.log('Seeding partners...');
        await Partner.insertMany(partners);

        console.log('Seeding newsletter subscriptions...');
        await Newsletter.insertMany(newsletters);

        console.log('All data seeded successfully!');
        
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seeder
seedDatabase();
