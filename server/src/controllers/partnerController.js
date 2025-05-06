const Partner = require('../models/Partner');

// @desc    Submit partnership application
// @route   POST /api/partners
// @access  Public
const submitPartnership = async (req, res) => {
    try {
        const partner = await Partner.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Your partnership application has been submitted successfully.',
            data: partner
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to submit partnership application. Please try again.',
            error: error.message
        });
    }
};

// @desc    Get all partnership applications
// @route   GET /api/partners
// @access  Private (Admin)
const getPartnerships = async (req, res) => {
    try {
        const { type, status } = req.query;
        const query = {};
        
        if (type) query.type = type;
        if (status) query.status = status;

        const partners = await Partner.find(query).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: partners
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch partnerships',
            error: error.message
        });
    }
};

// @desc    Update partnership status
// @route   PUT /api/partners/:id
// @access  Private (Admin)
const updatePartnershipStatus = async (req, res) => {
    try {
        const partner = await Partner.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!partner) {
            return res.status(404).json({
                success: false,
                message: 'Partnership application not found'
            });
        }

        res.json({
            success: true,
            message: 'Partnership status updated successfully',
            data: partner
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update partnership status',
            error: error.message
        });
    }
};

module.exports = {
    submitPartnership,
    getPartnerships,
    updatePartnershipStatus
};