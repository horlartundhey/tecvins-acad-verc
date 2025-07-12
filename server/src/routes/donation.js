const express = require('express');
const router = express.Router();
const {
  createStripeCheckout,
  createPaystackPayment,
  verifyPayment,
  getAllDonations,
  getDonationStats,
  handleStripeWebhook,
  handlePaystackWebhook
} = require('../controllers/donationController');
const { protect, checkRole } = require('../middleware/auth');

// Public routes (no authentication required)
router.post('/stripe/create', createStripeCheckout);
router.post('/paystack/create', createPaystackPayment);
router.post('/verify', verifyPayment);

// Webhook routes (special handling for raw body)
router.post('/webhooks/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);
router.post('/webhooks/paystack', handlePaystackWebhook);

// Protected routes (admin only)
router.get('/all', protect, checkRole(['admin', 'editor']), getAllDonations);
router.get('/stats', protect, checkRole(['admin', 'editor']), getDonationStats);

// Additional admin routes
router.get('/export', protect, checkRole(['admin']), async (req, res) => {
  try {
    const Donation = require('../models/Donation');
    const donations = await Donation.find({ status: 'completed' })
      .sort({ createdAt: -1 })
      .select('firstName lastName email amount currency paymentDate createdAt message');

    // Convert to CSV format
    const csv = [
      ['Date', 'Name', 'Email', 'Amount', 'Currency', 'Payment Date', 'Message'].join(','),
      ...donations.map(d => [
        d.createdAt.toISOString().split('T')[0],
        `"${d.firstName} ${d.lastName}"`,
        d.email,
        d.amount,
        d.currency,
        d.paymentDate ? d.paymentDate.toISOString().split('T')[0] : '',
        `"${d.message || ''}"`
      ].join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=donations.csv');
    res.send(csv);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export donations',
      error: error.message
    });
  }
});

// Get donation by ID (admin only)
router.get('/:id', protect, checkRole(['admin', 'editor']), async (req, res) => {
  try {
    const Donation = require('../models/Donation');
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      donation
    });

  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donation',
      error: error.message
    });
  }
});

// Update donation status (admin only)
router.put('/:id/status', protect, checkRole(['admin']), async (req, res) => {
  try {
    const { status, reason } = req.body;
    const Donation = require('../models/Donation');
    
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    if (status === 'failed' && reason) {
      await donation.markAsFailed(reason);
    } else {
      donation.status = status;
      await donation.save();
    }

    res.status(200).json({
      success: true,
      donation
    });

  } catch (error) {
    console.error('Error updating donation status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update donation status',
      error: error.message
    });
  }
});

// Add internal notes (admin only)
router.put('/:id/notes', protect, checkRole(['admin']), async (req, res) => {
  try {
    const { notes } = req.body;
    const Donation = require('../models/Donation');
    
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { internalNotes: notes },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      donation
    });

  } catch (error) {
    console.error('Error updating donation notes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update donation notes',
      error: error.message
    });
  }
});

module.exports = router;
