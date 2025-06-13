const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['individual', 'corporate'],
        required: true
    },
    // Common fields for both individual and corporate
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
        required: false // Optional in frontend
    },
    contactMethod: {
        type: [String],
        enum: ['email', 'phone', 'whatsapp'],
        required: true
    },
    // Corporate specific field
    companyName: {
        type: String,
        required: function() {
            return this.type === 'corporate';
        }
    },
    // Optional note/additional information
    note: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Validate required fields based on partner type
partnerSchema.pre('save', function(next) {
    if (this.type === 'corporate' && !this.companyName) {
        next(new Error('Company name is required for corporate partners'));
    }
    next();
});

module.exports = mongoose.model('Partner', partnerSchema);