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
    course: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    timeZone: {
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