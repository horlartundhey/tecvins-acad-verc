const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const {
    subscribe,
    unsubscribe,
    getSubscribers
} = require('../controllers/newsletterController');

// Public routes
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin routes
router.get('/subscribers', protect, checkRole(['admin']), getSubscribers);

module.exports = router;