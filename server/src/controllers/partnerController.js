const PartnerApplication = require('../models/PartnerApplication');
const logger = require('../utils/logger');

// @desc    Submit partnership application
// @route   POST /api/partners
// @access  Public
const submitPartnership = async (req, res) => {
    try {
        logger.info('Starting partnership application submission', {
            partnerType: req.body.type,
            headers: req.headers
        });

        const { type } = req.body;

        // Validate required fields based on partner type
        let requiredFields = ['type', 'firstName', 'lastName', 'email', 'contactMethod'];
        if (type === 'corporate') {
            requiredFields.push('companyName');
        }
        if (!['individual', 'corporate'].includes(type)) {
            logger.error('Invalid partner type submission', { type });
            return res.status(400).json({
                success: false,
                message: 'Invalid partner type. Must be either individual or corporate.'
            });
        }

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            logger.error('Missing required fields in partner application', { missingFields });
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Email validation
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(req.body.email)) {
            logger.error('Invalid email in partner application', { email: req.body.email });
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        const application = await PartnerApplication.create(req.body);
        logger.info('Partnership application submitted successfully', {
            applicationId: application._id,
            partnerType: application.type
        });
        
        res.status(201).json({
            success: true,
            message: 'Your partnership application has been submitted successfully.',
            data: application
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000 && error.keyPattern?.email) {
            logger.error('Duplicate email in partner application', { email: req.body.email });
            return res.status(400).json({
                success: false,
                message: 'An application with this email already exists.'
            });
        }

        logger.error('Error in partnership application submission', { error: error.message });
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
        logger.info('Admin requesting partnership applications', {
            adminId: req.user._id,
            query: req.query
        });

        const { type, status, search } = req.query;
        
        // Build query
        let query = {};
        
        if (status && status !== 'all') {
            query.status = status;
        }
        
        if (type && type !== 'all') {
            query.type = type;
        }

        if (search) {            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { companyName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const applications = await PartnerApplication.find(query)
            .sort({ createdAt: -1 })
            .select('-__v')
            .lean();

        logger.info('Successfully retrieved partnership applications', {
            adminId: req.user._id,
            count: applications.length,
            filters: { type, status, search }
        });

        res.json({
            success: true,
            data: applications
        });
    } catch (error) {
        logger.error('Error fetching partnerships', { 
            adminId: req.user._id,
            error: error.message 
        });
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
        logger.info('Admin updating partnership status', {
            adminId: req.user._id,
            partnershipId: req.params.id,
            newStatus: req.body.status
        });

        const { status } = req.body;
        
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            logger.error('Invalid status update attempt', {
                adminId: req.user._id,
                partnershipId: req.params.id,
                invalidStatus: status
            });
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const application = await PartnerApplication.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        ).select('-__v');

        if (!application) {
            logger.error('Partnership not found for status update', {
                adminId: req.user._id,
                partnershipId: req.params.id
            });
            return res.status(404).json({
                success: false,
                message: 'Partnership application not found'
            });
        }

        logger.info('Successfully updated partnership status', {
            adminId: req.user._id,
            partnershipId: application._id,
            oldStatus: application.status,
            newStatus: status
        });

        res.json({
            success: true,
            message: 'Partnership status updated successfully',
            data: application
        });
    } catch (error) {
        logger.error('Error updating partnership status', {
            adminId: req.user._id,
            partnershipId: req.params.id,
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to update partnership status',
            error: error.message
        });
    }
};

// @desc    Delete a partnership application
// @route   DELETE /api/partners/:id
// @access  Private (Admin)
const deletePartnership = async (req, res) => {
    try {
        logger.info('Admin attempting to delete partnership', {
            adminId: req.user._id,
            partnershipId: req.params.id
        });

        const application = await PartnerApplication.findByIdAndDelete(req.params.id);
        
        if (!application) {
            logger.error('Partnership not found for deletion', {
                adminId: req.user._id,
                partnershipId: req.params.id
            });
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        logger.info('Successfully deleted partnership', {
            adminId: req.user._id,
            partnershipId: req.params.id,
            partnerType: application.type
        });

        res.json({
            success: true,
            message: 'Partnership application deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting partnership', {
            adminId: req.user._id,
            partnershipId: req.params.id,
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Error deleting application',
            error: error.message
        });
    }
};

// @desc    Export partner applications
// @route   GET /api/partners/export
// @access  Private (Admin)
const exportPartnerships = async (req, res) => {
    try {
        logger.info('Admin exporting partnerships', {
            adminId: req.user._id
        });

        const applications = await PartnerApplication.find()
            .select('-__v')
            .lean();

        logger.info('Successfully exported partnerships', {
            adminId: req.user._id,
            count: applications.length
        });

        res.json({
            success: true,
            data: applications
        });
    } catch (error) {
        logger.error('Error exporting partnerships', {
            adminId: req.user._id,
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Error exporting applications',
            error: error.message
        });
    }
};

module.exports = {
    submitPartnership,
    getPartnerships,
    updatePartnershipStatus,
    deletePartnership,
    exportPartnerships
};