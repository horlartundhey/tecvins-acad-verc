const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const {
    getTestimonials,
    getAllTestimonialsAdmin,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialStatus
} = require('../controllers/testimonialController');

// Public routes
router.get('/', getTestimonials);

// Admin routes (protected)
router.get('/admin', protect, checkRole(['admin', 'editor']), getAllTestimonialsAdmin);
router.post('/', protect, checkRole(['admin', 'editor']), createTestimonial);
router.put('/:id', protect, checkRole(['admin', 'editor']), updateTestimonial);
router.delete('/:id', protect, checkRole(['admin']), deleteTestimonial);
router.patch('/:id/toggle', protect, checkRole(['admin', 'editor']), toggleTestimonialStatus);

module.exports = router;
