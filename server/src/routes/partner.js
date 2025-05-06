const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');

const {
    submitPartnership,
    getPartnerships,
    updatePartnershipStatus
} = require('../controllers/partnerController');

// Public routes
router.post('/', submitPartnership);

// Admin routes
router.get('/', protect, checkRole(['admin']), getPartnerships);
router.put('/:id', protect, checkRole(['admin']), updatePartnershipStatus);

module.exports = router;