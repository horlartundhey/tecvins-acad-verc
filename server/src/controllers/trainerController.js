const TrainerApplication = require('../models/TrainerApplication');

// @desc    Submit new trainer application
// @route   POST /api/trainers/apply
// @access  Public
const submitApplication = async (req, res) => {
    try {
        // Validate required fields in the request body
        const requiredFields = [
            'firstName', 'lastName', 'gender', 'country', 'email', 'phoneNumber',
            'courseArea', 'experience', 'skillRating', 'teachingExp', 'confidence', 'prepTime'
        ];

        // Convert FormData fields that might be strings back to objects/arrays
        if (req.body.expertise && typeof req.body.expertise === 'string') {
            try {
                req.body.expertise = JSON.parse(req.body.expertise);
            } catch (error) {
                console.log('Error parsing expertise:', error);
            }
        }
        if (req.body.preferredCourses && typeof req.body.preferredCourses === 'string') {
            try {
                req.body.preferredCourses = JSON.parse(req.body.preferredCourses);
            } catch (error) {
                console.log('Error parsing preferredCourses:', error);
            }
        }

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Email validation
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        const application = await TrainerApplication.create(req.body);
        
        res.status(201).json({
            success: true,
            message: 'Your trainer application has been submitted successfully. We will contact you shortly.',
            data: application
        });
    } catch (error) {
        console.error('Error submitting trainer application:', error);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: validationErrors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to submit trainer application. Please try again.',
            error: error.message
        });
    }
};

// @desc    Get all trainer applications
// @route   GET /api/trainers/applications
// @access  Private (Admin)
const getAllApplications = async (req, res) => {
    try {
        const { status, expertise, sortBy = 'createdAt', order = 'desc' } = req.query;
        
        let query = {};
        if (status) query.status = status;
        if (expertise) query.expertise = { $in: [expertise] };

        const applications = await TrainerApplication.find(query)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 });
            
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get trainer application by ID
// @route   GET /api/trainers/applications/:id
// @access  Private (Admin)
const getApplicationById = async (req, res) => {
    try {
        const application = await TrainerApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update trainer application status
// @route   PUT /api/trainers/applications/:id
// @access  Private (Admin)
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await TrainerApplication.findById(req.params.id);
        
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status;
        const updatedApplication = await application.save();
        
        res.json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Export trainer applications
// @route   GET /api/trainers/applications/export
// @access  Private (Admin)
const exportApplications = async (req, res) => {
    try {
        const { status, expertise, startDate, endDate } = req.query;
        
        let query = {};
        if (status) query.status = status;
        if (expertise) query.expertise = { $in: [expertise] };
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const applications = await TrainerApplication.find(query)
            .select('-__v')
            .lean();

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    submitApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationStatus,
    exportApplications
};