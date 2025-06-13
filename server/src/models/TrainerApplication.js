const mongoose = require('mongoose');

const trainerApplicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    courseArea: {
        type: String,
        required: [true, 'Course area is required'],
        enum: ['product-management', 'product-design', 'development', 'job-readiness']
    },
    experience: {
        type: String,
        required: [true, 'Experience is required'],
        enum: ['None', 'More than 6 months', 'Between 4-12 months', '2 - 18 months', '18 - 24 months', 'More than 24 months']
    },
    skillRating: {
        type: String,
        required: [true, 'Skill rating is required']
    },
    teachingExp: {
        type: String,
        required: [true, 'Teaching experience is required'],
        enum: ['Yes', 'No']
    },
    confidence: {
        type: String,
        required: [true, 'Confidence level is required'],
        enum: ['Not Confident', 'Slightly Confident', 'Moderately Confident', 'Confident', 'Very Confident']
    },
    prepTime: {
        type: String,
        required: [true, 'Preparation time is required'],
        enum: ['Less than 1 month', '1 - 2 months', '3 - 4 months', '5 - 6 months', 'More than 6 months']
    },
    note: String, // Optional
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