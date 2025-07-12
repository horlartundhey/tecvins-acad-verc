const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  // Donor Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  
  // Donation Details
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [1, 'Donation amount must be at least 1'],
    validate: {
      validator: function(value) {
        return Number.isFinite(value) && value > 0;
      },
      message: 'Amount must be a positive number'
    }
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: {
      values: ['USD', 'GBP', 'NGN'],
      message: 'Currency must be USD, GBP, or NGN'
    }
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  
  // Payment Processing
  paymentProcessor: {
    type: String,
    required: [true, 'Payment processor is required'],
    enum: {
      values: ['stripe', 'paystack'],
      message: 'Payment processor must be stripe or paystack'
    }
  },
  paymentReference: {
    type: String,
    unique: true,
    sparse: true // Allows multiple null values but unique non-null values
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  sessionId: {
    type: String, // For Stripe checkout sessions
    sparse: true
  },
  
  // Status and Metadata
  status: {
    type: String,
    required: true,
    enum: {
      values: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
      message: 'Invalid donation status'
    },
    default: 'pending'
  },
  paymentDate: {
    type: Date
  },
  failureReason: {
    type: String,
    trim: true
  },
  
  // Receipt and Tax
  receiptSent: {
    type: Boolean,
    default: false
  },
  receiptSentAt: {
    type: Date
  },
  taxDeductible: {
    type: Boolean,
    default: true
  },
  
  // Analytics and Internal Use
  source: {
    type: String,
    enum: ['website', 'campaign', 'event', 'social'],
    default: 'website'
  },
  campaign: {
    type: String,
    trim: true
  },
  
  // IP and Location (for fraud prevention)
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  
  // Notes (Internal use only)
  internalNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
donationSchema.index({ email: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ paymentProcessor: 1 });
donationSchema.index({ createdAt: -1 });
donationSchema.index({ paymentReference: 1 });
donationSchema.index({ transactionId: 1 });

// Virtual for donor full name
donationSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for formatted amount
donationSchema.virtual('formattedAmount').get(function() {
  const symbols = { USD: '$', GBP: '£', NGN: '₦' };
  const symbol = symbols[this.currency] || this.currency;
  return `${symbol}${this.amount.toLocaleString()}`;
});

// Pre-save middleware to generate payment reference if not provided
donationSchema.pre('save', function(next) {
  if (!this.paymentReference && this.isNew) {
    // Generate a unique reference based on timestamp and random string
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    this.paymentReference = `DON_${timestamp}_${random}`.toUpperCase();
  }
  
  // Set payment date when status changes to completed
  if (this.isModified('status') && this.status === 'completed' && !this.paymentDate) {
    this.paymentDate = new Date();
  }
  
  next();
});

// Static method to get donation statistics
donationSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $match: { status: 'completed' }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
        totalDonors: { $sum: 1 },
        averageDonation: { $avg: '$amount' },
        currencyBreakdown: {
          $push: {
            currency: '$currency',
            amount: '$amount'
          }
        }
      }
    }
  ]);

  // Get monthly stats
  const monthlyStats = await this.aggregate([
    {
      $match: {
        status: 'completed',
        paymentDate: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    },
    {
      $group: {
        _id: null,
        monthlyAmount: { $sum: '$amount' },
        monthlyDonors: { $sum: 1 }
      }
    }
  ]);

  const result = stats[0] || {
    totalAmount: 0,
    totalDonors: 0,
    averageDonation: 0,
    currencyBreakdown: []
  };

  const monthly = monthlyStats[0] || {
    monthlyAmount: 0,
    monthlyDonors: 0
  };

  return {
    ...result,
    ...monthly
  };
};

// Static method to find donations by email
donationSchema.statics.findByEmail = function(email) {
  return this.find({ email: email.toLowerCase() }).sort({ createdAt: -1 });
};

// Instance method to mark as completed
donationSchema.methods.markAsCompleted = function(transactionId) {
  this.status = 'completed';
  this.transactionId = transactionId;
  this.paymentDate = new Date();
  return this.save();
};

// Instance method to mark as failed
donationSchema.methods.markAsFailed = function(reason) {
  this.status = 'failed';
  this.failureReason = reason;
  return this.save();
};

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
