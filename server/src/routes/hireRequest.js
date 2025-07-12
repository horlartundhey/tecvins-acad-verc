const express = require('express');
const router = express.Router();
const hireRequestController = require('../controllers/hireRequestController');

// Public routes
router.post('/', hireRequestController.createHireRequest);

// Admin routes (should be protected in a real application)
router.get('/', hireRequestController.getAllHireRequests);
router.get('/stats', hireRequestController.getHireRequestStats);
router.get('/:id', hireRequestController.getHireRequestById);
router.put('/:id/status', hireRequestController.updateHireRequestStatus);
router.delete('/:id', hireRequestController.deleteHireRequest);

module.exports = router;
