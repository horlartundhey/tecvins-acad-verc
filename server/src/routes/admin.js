const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const {
    getDashboardStats,
    getRecentActivities,
    getUsers,
    updateUserRole
} = require('../controllers/adminController');

// All routes are protected and require admin role
router.use(protect);
router.use(checkRole(['admin']));

router.get('/stats', getDashboardStats);
router.get('/recent-activities', getRecentActivities);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);

module.exports = router;