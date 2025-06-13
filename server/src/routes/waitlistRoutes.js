const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const {
    submitWaitlist,
    getWaitlist,
    updateWaitlistStatus
} = require('../controllers/waitlistController');

// Public routes
router.post('/', express.json(), submitWaitlist);

// Protected routes (Admin only)
router.get('/', protect, checkRole(['admin']), getWaitlist);
router.put('/:id', protect, checkRole(['admin']), updateWaitlistStatus);

module.exports = router;
