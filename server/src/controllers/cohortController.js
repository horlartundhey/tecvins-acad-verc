const Cohort = require('../models/Cohort');
const logger = require('../utils/logger');

// @desc    Create a new cohort
// @route   POST /api/cohorts
// @access  Private (Admin)
const createCohort = async (req, res) => {
    try {
        const cohort = await Cohort.create(req.body);
        logger.info('New cohort created', {
            adminId: req.user._id,
            cohortId: cohort._id
        });
        
        res.status(201).json({
            success: true,
            message: 'Cohort created successfully',
            data: cohort
        });
    } catch (error) {
        logger.error('Error creating cohort', {
            adminId: req.user._id,
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to create cohort',
            error: error.message
        });
    }
};

// @desc    Get all cohorts
// @route   GET /api/cohorts
// @access  Public
const getCohorts = async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        
        if (status) {
            query.status = status;
        }

        const cohorts = await Cohort.find(query).sort({ startDate: 1 });
        res.json({
            success: true,
            data: cohorts
        });
    } catch (error) {
        logger.error('Error fetching cohorts', { error: error.message });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cohorts',
            error: error.message
        });
    }
};

// @desc    Get a single cohort
// @route   GET /api/cohorts/:id
// @access  Public
const getCohort = async (req, res) => {
    try {
        const cohort = await Cohort.findById(req.params.id);
        if (!cohort) {
            return res.status(404).json({
                success: false,
                message: 'Cohort not found'
            });
        }
        res.json({
            success: true,
            data: cohort
        });
    } catch (error) {
        logger.error('Error fetching cohort', {
            cohortId: req.params.id,
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cohort',
            error: error.message
        });
    }
};

// @desc    Update a cohort
// @route   PUT /api/cohorts/:id
// @access  Private (Admin)
const updateCohort = async (req, res) => {
    try {
        // If current enrollment is being updated, validate against max students
        if (req.body.currentEnrollment !== undefined) {
            const cohort = await Cohort.findById(req.params.id);
            if (!cohort) {
                return res.status(404).json({
                    success: false,
                    message: 'Cohort not found'
                });
            }

            // Don't allow enrollment to exceed max students
            if (req.body.currentEnrollment > cohort.maxStudents) {
                return res.status(400).json({
                    success: false,
                    message: 'Current enrollment cannot exceed maximum students'
                });
            }

            // Auto-toggle waitlist based on capacity
            if (req.body.currentEnrollment >= cohort.maxStudents && !cohort.isWaitlistEnabled) {
                req.body.isWaitlistEnabled = true;
            } else if (req.body.currentEnrollment < cohort.maxStudents) {
                req.body.isWaitlistEnabled = false;
            }
        }

        const updatedCohort = await Cohort.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCohort) {
            return res.status(404).json({
                success: false,
                message: 'Cohort not found'
            });
        }

        logger.info('Cohort updated successfully', {
            adminId: req.user._id,
            cohortId: updatedCohort._id
        });

        res.json({
            success: true,
            message: 'Cohort updated successfully',
            data: updatedCohort
        });
    } catch (error) {
        logger.error('Error updating cohort', {
            adminId: req.user._id,
            cohortId: req.params.id,
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to update cohort',
            error: error.message
        });
    }
};

// @desc    Delete a cohort
// @route   DELETE /api/cohorts/:id
// @access  Private (Admin)
const deleteCohort = async (req, res) => {
    try {
        const cohort = await Cohort.findByIdAndDelete(req.params.id);
        
        if (!cohort) {
            return res.status(404).json({
                success: false,
                message: 'Cohort not found'
            });
        }

        logger.info('Cohort deleted successfully', {
            adminId: req.user._id,
            cohortId: req.params.id
        });

        res.json({
            success: true,
            message: 'Cohort deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting cohort', {
            adminId: req.user._id,
            cohortId: req.params.id,
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to delete cohort',
            error: error.message
        });
    }
};

// @desc    Set a cohort as active (and deactivate others)
// @route   PATCH /api/cohorts/:id/active
// @access  Private (Admin)
const setActiveCohort = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (isActive) {
            // First, deactivate all cohorts
            await Cohort.updateMany({}, { isActive: false });
        }

        // Then update the target cohort
        const cohort = await Cohort.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!cohort) {
            return res.status(404).json({
                success: false,
                message: 'Cohort not found'
            });
        }

        logger.info(`Cohort ${isActive ? 'activated' : 'deactivated'}`, {
            adminId: req.user._id,
            cohortId: cohort._id
        });

        res.json({
            success: true,
            message: `Cohort ${isActive ? 'activated' : 'deactivated'} successfully`,
            data: cohort
        });
    } catch (error) {
        logger.error('Error setting active cohort', {
            adminId: req.user._id,
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to update cohort active status',
            error: error.message
        });
    }
};

module.exports = {
    createCohort,
    getCohorts,
    getCohort,
    updateCohort,
    deleteCohort,
    setActiveCohort,
};