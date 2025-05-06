const StudentApplication = require('../models/StudentApplication');

// @desc    Submit new student application
// @route   POST /api/students/apply
// @access  Public
const submitApplication = async (req, res) => {
    try {
        const application = await StudentApplication.create(req.body);
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all applications (for admin)
// @route   GET /api/students/applications
// @access  Private (Admin)
const getAllApplications = async (req, res) => {
    try {
        const { status, course, sortBy = 'createdAt', order = 'desc' } = req.query;
        
        let query = {};
        if (status) query.status = status;
        if (course) query.course = course;

        const applications = await StudentApplication.find(query)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 });
            
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get application by ID
// @route   GET /api/students/applications/:id
// @access  Private (Admin)
const getApplicationById = async (req, res) => {
    try {
        const application = await StudentApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update application status
// @route   PUT /api/students/applications/:id
// @access  Private (Admin)
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await StudentApplication.findById(req.params.id);
        
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

// @desc    Export applications
// @route   GET /api/students/applications/export
// @access  Private (Admin)
const exportApplications = async (req, res) => {
    try {
        const { status, course, startDate, endDate } = req.query;
        
        let query = {};
        if (status) query.status = status;
        if (course) query.course = course;
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const applications = await StudentApplication.find(query)
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