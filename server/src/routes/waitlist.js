const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const {
    submitWaitlist,
    getWaitlistEntries,
    updateWaitlistStatus,
    deleteWaitlistEntry
} = require('../controllers/waitlistController');

// Public routes
router.post('/submit', express.json(), submitWaitlist);

// Protected routes (Admin only)
router.get('/', protect, checkRole(['admin']), getWaitlistEntries);
router.put('/:id', protect, checkRole(['admin']), updateWaitlistStatus);
router.delete('/:id', protect, checkRole(['admin']), deleteWaitlistEntry);

module.exports = router;
