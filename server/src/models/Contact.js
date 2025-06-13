const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
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
        required: false // Making optional since frontend shows it as optional
    },
    message: {
        type: String,
        required: false // Making optional since frontend shows "Additional Note (Optional)"
    },
    // Virtual field for full name
    fullName: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'responded', 'closed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Virtual for full name
contactSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to set fullName
contactSchema.pre('save', function(next) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
});

module.exports = mongoose.model('Contact', contactSchema);