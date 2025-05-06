const mongoose = require('mongoose');

const studentApplicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    course: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    currentOccupation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: 'Nigeria'
    },
    timeZone: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
        default: '2025'
    },
    cohort: {
        type: String,
        required: true
    },
    reason: {
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

const StudentApplication = mongoose.model('StudentApplication', studentApplicationSchema);
module.exports = StudentApplication;