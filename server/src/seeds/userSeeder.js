const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
        name: 'John Trainer',
        email: 'trainer@tecvinson.com',
        password: 'trainer123',
        role: 'trainer'
    },
    {
        name: 'Student User',
        email: 'student@tecvinson.com',
        password: 'student123',
        role: 'student'
    }
];

const seedUsers = async () => {
    try {
        // Clear existing users
        await User.deleteMany({});
        
        // Hash passwords and create users
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            return user;
        }));

        await User.insertMany(hashedUsers);
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
};

module.exports = seedUsers;
