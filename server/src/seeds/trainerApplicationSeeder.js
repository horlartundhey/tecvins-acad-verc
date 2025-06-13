const TrainerApplication = require('../models/TrainerApplication');

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
    },
    {
        fullName: 'Robert Brown',
        email: 'robert.b@example.com',
        phoneNumber: '+234567890128',
        expertise: ['AWS', 'Docker', 'Kubernetes'],
        yearsOfExperience: 6,
        resume: 'https://example.com/resumes/robert-brown.pdf',
        portfolio: 'https://github.com/robertb',
        linkedIn: 'https://linkedin.com/in/robertb',
        preferredCourses: ['DevOps'],
        availability: 'Weekends',
        status: 'approved'
    }
];

const seedTrainerApplications = async () => {
    try {
        // Clear existing applications
        await TrainerApplication.deleteMany({});
        
        // Create new applications
        await TrainerApplication.insertMany(trainerApplications);
        console.log('Trainer applications seeded successfully');
    } catch (error) {
        console.error('Error seeding trainer applications:', error);
        throw error;
    }
};

module.exports = seedTrainerApplications;
