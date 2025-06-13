const mongoose = require('mongoose');

const cohortSettingsSchema = new mongoose.Schema({
    cohortName: {
        type: String,
        required: [true, 'Cohort name is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    maxCapacity: {
        type: Number,
        required: [true, 'Maximum capacity is required'],
        min: [1, 'Maximum capacity must be at least 1']
    },
    isWaitlistEnabled: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    tuitionFee: {
        type: String,
        required: [true, 'Tuition fee information is required']
    },
    availableSpots: {
        type: Number,
        required: [true, 'Available spots is required'],
        min: [0, 'Available spots cannot be negative']
    },
    applicationDeadline: {
        type: Date,
        required: [true, 'Application deadline is required']
    },
    prerequisites: {
        type: String,
        required: [true, 'Prerequisites information is required']
    },
    curriculum: {
        type: String,
        required: [true, 'Curriculum overview is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CohortSettings', cohortSettingsSchema);
