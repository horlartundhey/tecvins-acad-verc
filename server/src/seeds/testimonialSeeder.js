const Testimonial = require('../models/Testimonial');

const testimonialData = [
    {
        name: 'Gloria Ondieki',
        title: 'Graduate, Web Development Program',
        image: 'https://res.cloudinary.com/dwgyu7pr9/image/upload/v1749836961/gloria_pon7wq.png',
        videoUrl: 'https://res.cloudinary.com/dwgyu7pr9/video/upload/v1749835087/Tecvinson_Academy_Gloria_Ondieki_szuhrc.mp4',
        quote: [
            'The hands-on approach at Tecvinson Academy gave me practical skills that I use every day.',
            'The curriculum is up-to-date with industry standards, and the career support helped me connect with top employers in the field.'
        ],
        program: 'development',
        displayOrder: 1,
        isActive: true
    },
    {
        name: 'Clifford Tochi',
        title: 'Student at Tecvinson Academy',
        image: 'https://res.cloudinary.com/dwgyu7pr9/image/upload/v1749836961/clifford_yifuaq.png',
        videoUrl: 'https://res.cloudinary.com/dwgyu7pr9/video/upload/v1749835078/Tecvinson_Academy_Clifford_Tochi_jb9lx9.mp4',
        quote: [
            "Enrolling at Tecvinson Academy was one of the best decisions I've ever made! The instructors were incredibly knowledgeable and always willing to help, making the learning experience truly enjoyable."
        ],
        program: 'all',
        displayOrder: 2,
        isActive: true
    }
];

const seedTestimonials = async () => {
    try {
        const existing = await Testimonial.countDocuments();
        if (existing > 0) {
            console.log(`Testimonials already seeded (${existing} records found). Skipping.`);
            return;
        }

        await Testimonial.insertMany(testimonialData);
        console.log(`✅ Seeded ${testimonialData.length} testimonials successfully.`);
    } catch (error) {
        console.error('❌ Error seeding testimonials:', error.message);
        throw error;
    }
};

module.exports = seedTestimonials;
