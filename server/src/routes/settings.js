const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const { getSettings, updateSettings } = require('../controllers/settingsController');

router.get('/', getSettings);
router.patch('/', protect, checkRole(['admin']), updateSettings);

module.exports = router;
