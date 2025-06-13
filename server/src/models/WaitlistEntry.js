const mongoose = require('mongoose');

const waitlistEntrySchema = new mongoose.Schema({
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
        required: true,
        unique: true
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
    preferredCohort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cohort',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'enrolled'],
        default: 'pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
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

// Create indexes
waitlistEntrySchema.index({ email: 1 });
waitlistEntrySchema.index({ preferredCohort: 1 });
waitlistEntrySchema.index({ status: 1 });

const WaitlistEntry = mongoose.model('WaitlistEntry', waitlistEntrySchema);
module.exports = WaitlistEntry;
