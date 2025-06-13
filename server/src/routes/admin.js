const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const { 
    getDashboardStats,
    getAllCohorts,
    updateCohortActivation,
    updateCohort
} = require('../controllers/adminController');

// All routes are protected and require admin role
router.use(protect);
router.use(checkRole(['admin']));

// Dashboard routes
router.get('/stats', getDashboardStats);

// Cohort management routes
router.get('/cohorts', getAllCohorts);
router.put('/cohorts/:id/activation', updateCohortActivation);
router.put('/cohorts/:id', updateCohort);

module.exports = router;