const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const { 
    submitPartnership,
    getPartnerships,
    updatePartnershipStatus,
    deletePartnership,
    exportPartnerships
} = require('../controllers/partnerController');

// Public routes
router.post('/', express.json(), submitPartnership);

// Protected routes (Admin only)
router.get('/', protect, checkRole(['admin']), getPartnerships);
router.get('/export', protect, checkRole(['admin']), exportPartnerships);
router.put('/:id', protect, checkRole(['admin']), updatePartnershipStatus);
router.delete('/:id', protect, checkRole(['admin']), deletePartnership);

module.exports = router;