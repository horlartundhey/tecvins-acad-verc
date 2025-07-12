const mongoose = require("mongoose");

const hireRequestSchema = new mongoose.Schema({
  // Company Information
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  companyWebsite: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },

  // Contact Person Information
  contactName: {
    type: String,
    required: true,
    trim: true
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true
  },
  contactPhone: {
    type: String,
    required: true,
    trim: true
  },
  jobTitle: {
    type: String,
    trim: true
  },
  preferredContactMethod: {
    type: String,
    enum: ['email', 'phone', 'whatsapp'],
    default: 'email'
  },

  // Request Type and Details
  requestType: {
    type: String,
    enum: ['quick', 'detailed'],
    required: true
  },

  // Engagement Information
  engagementTypes: [{
    type: String,
    enum: ['Internship', 'Contract', 'Full-Time', 'Part-Time', 'Volunteer']
  }],
  engagementType: {
    type: String,
    enum: ['Internship', 'Contract', 'Full-Time', 'Part-Time', 'Volunteer']
  },
  projectBased: {
    type: Boolean,
    default: false
  },
  workModality: {
    type: String,
    enum: ['remote', 'hybrid', 'onsite']
  },
  startDate: {
    type: Date
  },
  duration: {
    type: String
  },

  // Resource Requirements
  resourcesNeeded: {
    type: String
  },
  selectedTracks: [{
    type: String
  }],
  skillLevel: {
    type: String
  },
  jobDescription: {
    type: String
  },
  message: {
    type: String
  },

  // Compensation and Support
  paidOpportunity: {
    type: String,
    enum: ['Yes', 'No', 'Negotiable']
  },
  trainingSupport: {
    type: String,
    enum: ['Yes', 'No']
  },
  workPermitNeeded: {
    type: String,
    enum: ['Yes', 'No', 'Not Sure']
  },
  workPermitAssistance: {
    type: String,
    enum: ['Yes', 'No']
  },
  toolsProvided: {
    type: String
  },

  // Additional Information
  additionalInformation: {
    type: String
  },
  acknowledgment: {
    type: Boolean,
    default: false
  },

  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'contacted', 'closed'],
    default: 'pending'
  },
  
  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
hireRequestSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const HireRequest = mongoose.model("HireRequest", hireRequestSchema);

module.exports = HireRequest;
