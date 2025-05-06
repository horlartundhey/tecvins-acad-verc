const Contact = require('../models/Contact');

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully. We will get back to you soon.',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.',
            error: error.message
        });
    }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin)
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts',
            error: error.message
        });
    }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
const updateContactStatus = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact status updated successfully',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update contact status',
            error: error.message
        });
    }
};

module.exports = {
    submitContact,
    getContacts,
    updateContactStatus
};