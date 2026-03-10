const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    quote: [{
        type: String,
        required: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    program: {
        type: String,
        enum: ['product-management', 'product-design', 'development', 'job-readiness', 'all'],
        default: 'all'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
