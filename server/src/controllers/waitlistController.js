const mongoose = require('mongoose');
const Waitlist = require('../models/Waitlist');
const Cohort = require('../models/Cohort');
const logger = require('../utils/logger');

// Valid course types
const validCourses = ['product-management', 'product-design', 'development', 'job-readiness'];

// @desc    Submit waitlist application
// @route   POST /api/waitlist
// @access  Public
const submitWaitlist = async (req, res) => {
    try {
        logger.info('=== WAITLIST SUBMISSION STARTED ===', { 
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            contentType: req.get('Content-Type'),
            userAgent: req.get('User-Agent'),
            origin: req.get('Origin'),
            ip: req.ip || req.connection.remoteAddress,
            bodyKeys: Object.keys(req.body || {}),
            body: req.body
        });        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'course', 'country', 'timeZone', 'reason', 'preferredCohort'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            logger.error('Waitlist submission failed: Missing required fields', {
                missingFields,
                providedFields: Object.keys(req.body),
                receivedData: req.body,
                timestamp: new Date().toISOString()
            });
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate course value
        const validCourses = ['product-management', 'product-design', 'development', 'job-readiness'];
        if (!validCourses.includes(req.body.course)) {
            logger.error('Waitlist submission failed: Invalid course value', {
                providedCourse: req.body.course,
                validCourses,
                timestamp: new Date().toISOString()
            });
            return res.status(400).json({
                success: false,
                message: `Invalid course value. Must be one of: ${validCourses.join(', ')}`
            });
        }

        // Validate course value
        if (!validCourses.includes(req.body.course)) {
            logger.error('Waitlist submission failed: Invalid course value', {
                providedCourse: req.body.course,
                validCourses,
                timestamp: new Date().toISOString()
            });
            return res.status(400).json({
                success: false,
                message: `Invalid course value. Must be one of: ${validCourses.join(', ')}`
            });
        }

        logger.info('All required fields provided and course validated', { 
            fieldCount: Object.keys(req.body).length,
            providedFields: Object.keys(req.body),
            course: req.body.course
        });// Validate email format
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(req.body.email)) {
            logger.error('Waitlist submission failed: Invalid email format', {
                email: req.body.email,
                timestamp: new Date().toISOString()
            });
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        logger.info('Email validation passed', { email: req.body.email });

        // Check if the cohort exists
        logger.info('Checking cohort existence', { cohortId: req.body.preferredCohort });
        const cohort = await Cohort.findById(req.body.preferredCohort);
        if (!cohort) {
            logger.error('Waitlist submission failed: Cohort not found', {
                cohortId: req.body.preferredCohort,
                timestamp: new Date().toISOString()
            });
            return res.status(404).json({
                success: false,
                message: 'Cohort not found'
            });
        }

        logger.info('Cohort found', { 
            cohortId: cohort._id,
            cohortTitle: cohort.title,
            isWaitlistEnabled: cohort.isWaitlistEnabled,
            isAtCapacity: cohort.isAtCapacity
        });        if (!cohort.isWaitlistEnabled && !cohort.isAtCapacity) {
            logger.error('Waitlist submission failed: Cohort not accepting waitlist applications', {
                cohortId: cohort._id,
                cohortTitle: cohort.title,
                isWaitlistEnabled: cohort.isWaitlistEnabled,
                isAtCapacity: cohort.isAtCapacity,
                timestamp: new Date().toISOString()
            });
            return res.status(400).json({
                success: false,
                message: 'This cohort is currently accepting direct applications'
            });
        }

        logger.info('Creating waitlist application', { 
            applicationData: req.body,
            cohortInfo: {
                id: cohort._id,
                title: cohort.title
            }
        });

        const application = await Waitlist.create(req.body);
          logger.info('Waitlist application submitted successfully', {
            applicationId: application._id,
            cohortId: cohort._id,
            userEmail: application.email,
            timestamp: new Date().toISOString()
        });

        const responseData = {
            success: true,
            message: "You've been added to the waitlist successfully. We'll notify you when a spot becomes available.",
            data: application
        };

        logger.info('=== WAITLIST SUBMISSION SUCCESS ===', {
            responseStatus: 201,
            responseData: responseData,
            timestamp: new Date().toISOString()
        });        res.status(201).json(responseData);
    } catch (error) {
        logger.error('=== WAITLIST SUBMISSION ERROR ===', {
            error: error.message,
            stack: error.stack,
            requestBody: req.body,
            mongoError: error.code ? {
                code: error.code,
                keyPattern: error.keyPattern,
                keyValue: error.keyValue
            } : null,
            timestamp: new Date().toISOString(),
            userAgent: req.get('User-Agent'),
            ip: req.ip || req.connection.remoteAddress,
            headers: req.headers
        });
        
        // Handle duplicate email error
        if (error.code === 11000 && error.keyPattern?.email) {
            logger.info('Duplicate email attempt detected', {
                email: req.body.email,
                timestamp: new Date().toISOString()
            });
            return res.status(400).json({
                success: false,
                message: 'You are already on the waitlist for this cohort.'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to submit waitlist application',
            error: error.message
        });
    }
};

// @desc    Get all waitlist entries (Admin only)
// @route   GET /api/waitlist
// @access  Private
const getWaitlist = async (req, res) => {
    try {
        const entries = await Waitlist.find()
            .populate('preferredCohort', 'title startDate endDate')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: entries
        });
    } catch (error) {
        logger.error('Error fetching waitlist entries', {
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch waitlist entries',
            error: error.message
        });
    }
};

// @desc    Update waitlist entry status
// @route   PUT /api/waitlist/:id
// @access  Private
const updateWaitlistStatus = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { status, notifyStudent } = req.body;
        
        // Get waitlist entry first
        const waitlistEntry = await Waitlist.findById(req.params.id);
        if (!waitlistEntry) {
            return res.status(404).json({
                success: false,
                message: 'Waitlist entry not found'
            });
        }

        // If enrolling, check cohort capacity
        if (status === 'enrolled') {
            const cohort = await Cohort.findById(waitlistEntry.preferredCohort);
            if (!cohort) {
                throw new Error('Associated cohort not found');
            }

            if (cohort.currentEnrollment >= cohort.maxStudents) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot enroll: cohort is at maximum capacity'
                });
            }

            // Increment enrollment count
            await Cohort.findByIdAndUpdate(
                cohort._id,
                { $inc: { currentEnrollment: 1 } },
                { session }
            );
        }
        
        const update = { status };
        
        if (notifyStudent) {
            const notification = {
                type: status === 'accepted' ? 'acceptance' : 
                      status === 'rejected' ? 'rejection' : 
                      status === 'enrolled' ? 'enrollment' : 'reminder',
                message: `Status updated to ${status}`,
                sentAt: new Date()
            };
            
            update.$push = { notificationsSent: notification };
        }
        
        const entry = await Waitlist.findByIdAndUpdate(
            req.params.id,
            update,
            { new: true, session }
        );

        await session.commitTransaction();
        
        // If enrolled successfully, check if we can disable waitlist
        if (status === 'enrolled') {
            const cohort = await Cohort.findById(waitlistEntry.preferredCohort);
            if (cohort && !cohort.isAtCapacity) {
                cohort.isWaitlistEnabled = false;
                await cohort.save();
            }
        }

        res.json({
            success: true,
            message: 'Waitlist status updated successfully',
            data: entry
        });
    } catch (error) {
        await session.abortTransaction();
        logger.error('Error updating waitlist status', {
            error: error.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to update waitlist status',
            error: error.message
        });
    } finally {
        session.endSession();
    }
};

// @desc    Delete waitlist entry
// @route   DELETE /api/waitlist/:id
// @access  Private
const deleteWaitlistEntry = async (req, res) => {
    try {
        const entry = await Waitlist.findByIdAndDelete(req.params.id);
        
        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Waitlist entry not found'
            });
        }

        logger.info('Waitlist entry deleted successfully', {
            entryId: req.params.id,
            adminId: req.user._id
        });

        res.json({
            success: true,
            message: 'Waitlist entry deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting waitlist entry', {
            error: error.message,
            entryId: req.params.id
        });
        res.status(500).json({
            success: false,
            message: 'Failed to delete waitlist entry',
            error: error.message
        });
    }
};

// @desc    Get waitlist entries (alternative name for getWaitlist)
// @route   GET /api/waitlist
// @access  Private
const getWaitlistEntries = async (req, res) => {
    return getWaitlist(req, res);
};

module.exports = {
    submitWaitlist,
    getWaitlist,
    getWaitlistEntries,
    updateWaitlistStatus,
    deleteWaitlistEntry
};
