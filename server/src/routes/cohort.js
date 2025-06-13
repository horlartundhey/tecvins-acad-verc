const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const {
    createCohort,
    getCohorts,
    getCohort,
    updateCohort,
    setActiveCohort
} = require('../controllers/cohortController');

// Public routes
router.get('/', getCohorts); // Get all cohorts
router.get('/:id', getCohort); // Get a single cohort

// Protected routes (Admin only)
router.post('/', protect, checkRole(['admin']), createCohort); // Create a new cohort
router.put('/:id', protect, checkRole(['admin']), updateCohort); // Update a cohort
router.patch('/:id/active', protect, checkRole(['admin']), setActiveCohort); // Set cohort active status

module.exports = router;