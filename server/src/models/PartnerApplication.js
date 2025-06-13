const mongoose = require('mongoose');

const partnerApplicationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['individual', 'corporate']
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
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    phoneNumber: {
        type: String,
        required: false // Optional as per frontend
    },
    contactMethod: [{
        type: String,
        enum: ['email', 'phone', 'whatsapp']
    }],
    // Corporate specific field
    companyName: {
        type: String,
        required: function() { return this.type === 'corporate'; }
    },
    // Optional note field    
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

// Add indexes for better query performance
partnerApplicationSchema.index({ status: 1, createdAt: -1 });
partnerApplicationSchema.index({ type: 1, status: 1 });
partnerApplicationSchema.index({ email: 1 }, { unique: true });

const PartnerApplication = mongoose.model('PartnerApplication', partnerApplicationSchema);

module.exports = PartnerApplication;