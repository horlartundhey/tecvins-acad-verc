const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['individual', 'corporate'],
        required: true
    },
    // Common fields
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    // Individual specific fields
    firstName: String,
    lastName: String,
    profession: String,
    linkedIn: String,
    // Corporate specific fields
    companyName: String,
    position: String,
    companySize: String,
    website: String,
    industryType: String,
    // Partnership details
    partnershipInterest: {
        type: [String],
        required: true
    },
    additionalInfo: String,
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
    if (this.type === 'individual') {
        if (!this.firstName || !this.lastName || !this.profession) {
            next(new Error('First name, last name, and profession are required for individual partners'));
        }
    } else if (this.type === 'corporate') {
        if (!this.companyName || !this.position || !this.industryType) {
            next(new Error('Company name, position, and industry type are required for corporate partners'));
        }
    }
    next();
});

module.exports = mongoose.model('Partner', partnerSchema);