const StudentApplication = require('../models/StudentApplication');

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
    },
    {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.j@example.com',
        phoneNumber: '+234567890125',
        dateOfBirth: '1997-03-10',
        gender: 'male',
        course: 'DevOps',
        education: 'Master in Software Engineering',
        currentOccupation: 'System Administrator',
        address: '789 Cloud Street, Port Harcourt',
        country: 'Nigeria',
        timeZone: 'WAT',
        year: '2025',
        cohort: 'Fall 2025',
        reason: 'To learn modern DevOps practices',
        status: 'pending'
    }
];

const seedStudentApplications = async () => {
    try {
        // Clear existing applications
        await StudentApplication.deleteMany({});
        
        // Create new applications
        await StudentApplication.insertMany(studentApplications);
        console.log('Student applications seeded successfully');
    } catch (error) {
        console.error('Error seeding student applications:', error);
        throw error;
    }
};

module.exports = seedStudentApplications;
