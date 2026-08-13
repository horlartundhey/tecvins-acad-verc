const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect, checkRole } = require('../middleware/auth');

// Public routes
router.post('/login', loginUser);

// Account creation is an admin action - a public register endpoint let anyone
// create an account and pick their own role, including 'admin'
router.post('/register', protect, checkRole(['admin']), registerUser);

// Protected routes
router.get('/profile', protect, getUserProfile);

module.exports = router;