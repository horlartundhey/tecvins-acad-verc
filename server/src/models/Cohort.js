const mongoose = require('mongoose');

const cohortSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    enrollmentDeadline: {
        type: Date,
        required: true
    },
    courses: [{
        type: String,
        required: true,
        enum: ['product-management', 'product-design', 'development', 'job-readiness']
    }],
    maxStudents: {
        type: Number,
        required: true
    },
    currentEnrollment: {
        type: Number,
        default: 0
    },
    isWaitlistEnabled: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming'
    },
    description: {
        type: String,
        required: true
    },
    scheduleTime: {
        type: String,
        required: true,
        default: "Saturdays and Sundays, 14:00 - 16:00 (CET)"
    },
    deliveryMode: {
        type: String,
        required: true,
        default: "Online (via Microsoft Teams)"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field to check if cohort is at capacity
cohortSchema.virtual('isAtCapacity').get(function() {
    return this.currentEnrollment >= this.maxStudents;
});

// Middleware to auto-enable waitlist when at capacity
cohortSchema.pre('save', function(next) {
    if (this.isAtCapacity && !this.isWaitlistEnabled) {
        this.isWaitlistEnabled = true;
    }
    next();
});

module.exports = mongoose.model('Cohort', cohortSchema);
