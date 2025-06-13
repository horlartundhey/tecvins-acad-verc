const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
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
        required: true,
        enum: ['product-management', 'product-design', 'development', 'job-readiness']
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
    preferredCohort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cohort',
        required: true
    },    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'enrolled'],
        default: 'pending'
    },
    notificationsSent: [{
        type: {
            type: String,
            enum: ['acceptance', 'rejection', 'enrollment', 'reminder'],
            required: true
        },
        sentAt: {
            type: Date,
            default: Date.now
        },
        message: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Waitlist', waitlistSchema);
