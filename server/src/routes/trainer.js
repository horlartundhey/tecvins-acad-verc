const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const {
    submitApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationStatus,
    exportApplications
} = require('../controllers/trainerController');

// Public routes
router.post('/apply', submitApplication);

// Protected routes (Admin only)
router.get('/applications', protect, checkRole(['admin']), getAllApplications);
router.get('/applications/export', protect, checkRole(['admin']), exportApplications);
router.get('/applications/:id', protect, checkRole(['admin']), getApplicationById);
router.put('/applications/:id', protect, checkRole(['admin']), updateApplicationStatus);

module.exports = router;