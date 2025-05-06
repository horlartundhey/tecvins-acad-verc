const mongoose = require('mongoose');

const trainerApplicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    expertise: {
        type: [String],
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    resume: {
        type: String,  // URL to stored resume file
        required: true
    },
    portfolio: String, // Optional portfolio URL
    linkedIn: String,
    preferredCourses: {
        type: [String],
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const TrainerApplication = mongoose.model('TrainerApplication', trainerApplicationSchema);
module.exports = TrainerApplication;