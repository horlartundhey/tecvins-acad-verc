const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');

const {
    submitContact,
    getContacts,
    updateContactStatus,
    deleteContact
} = require('../controllers/contactController');

// Public routes
router.post('/', submitContact);

// Admin routes
router.get('/', protect, checkRole(['admin']), getContacts);

router.put('/:id', protect, checkRole(['admin']), updateContactStatus);

router.delete('/:id', protect, checkRole(['admin']), deleteContact);

module.exports = router;