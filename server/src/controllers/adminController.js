const StudentApplication = require('../models/StudentApplication');
const TrainerApplication = require('../models/TrainerApplication');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Partner = require('../models/Partner');
const Cohort = require('../models/Cohort');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
    // Get current ETag
    const currentEtag = req.get('If-None-Match');
    
    try {
        // Check for valid cached response
        if (currentEtag) {
            // Return not modified if cache is still valid
            return res.status(304).end();
        }
        
        // If no cache or expired, fetch all stats in parallel using Promise.all
        const [
            studentStats,
            trainerStats,
            blogStats,
            contactStats,
            partnerStats,
            userStats,
            recentStudents,
            recentTrainers,
            recentBlogs
        ] = await Promise.all([
            // Student stats
            Promise.all([
                StudentApplication.countDocuments(),
                StudentApplication.countDocuments({ status: 'pending' }),
                StudentApplication.countDocuments({ status: 'approved' }),
                StudentApplication.countDocuments({ status: 'rejected' })
            ]),
            // Trainer stats
            Promise.all([
                TrainerApplication.countDocuments(),
                TrainerApplication.countDocuments({ status: 'pending' }),
                TrainerApplication.countDocuments({ status: 'approved' }),
                TrainerApplication.countDocuments({ status: 'rejected' })
            ]),
            // Blog stats
            Promise.all([
                Blog.countDocuments(),
                Blog.countDocuments({ status: 'published' }),
                Blog.countDocuments({ status: 'draft' })
            ]),
            // Contact stats
            Promise.all([
                Contact.countDocuments(),
                Contact.countDocuments({ status: 'pending' }),
                Contact.countDocuments({ status: 'responded' }),
                Contact.countDocuments({ status: 'closed' })
            ]),
            // Partner stats
            Promise.all([
                Partner.countDocuments(),
                Partner.countDocuments({ status: 'pending' }),
                Partner.countDocuments({ status: 'approved' }),
                Partner.countDocuments({ status: 'rejected' })
            ]),
            // User stats
            Promise.all([
                User.countDocuments(),
                User.countDocuments({ role: 'admin' }),
                User.countDocuments({ role: 'editor' })
            ]),
            // Recent activities
            StudentApplication.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('firstName lastName course status createdAt'),
            TrainerApplication.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('fullName expertise status createdAt'),
            Blog.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('title status createdAt')
                .populate('author', 'name')
        ]);

        // Format the stats into a structured object
        const stats = {
            students: {
                total: studentStats[0],
                pending: studentStats[1],
                approved: studentStats[2],
                rejected: studentStats[3]
            },
            trainers: {
                total: trainerStats[0],
                pending: trainerStats[1],
                approved: trainerStats[2],
                rejected: trainerStats[3]
            },
            blogs: {
                total: blogStats[0],
                published: blogStats[1],
                draft: blogStats[2]
            },
            contacts: {
                total: contactStats[0],
                pending: contactStats[1],
                responded: contactStats[2],
                closed: contactStats[3]
            },
            partners: {
                total: partnerStats[0],
                pending: partnerStats[1],
                approved: partnerStats[2],
                rejected: partnerStats[3]
            },
            users: {
                total: userStats[0],
                admins: userStats[1],
                editors: userStats[2]
            }
        };

        // Set cache control headers
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Expires', '0');
        res.set('Pragma', 'no-cache');
        
        res.json({
            stats,
            recentActivities: {
                students: recentStudents,
                trainers: recentTrainers,
                blogs: recentBlogs
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ 
            message: 'Error fetching dashboard statistics', 
            error: error.message 
        });
    }
};

// @desc    Get recent activities
// @route   GET /api/admin/recent-activities
// @access  Private (Admin only)
const getRecentActivities = async (req, res) => {
    try {
        const recentStudents = await StudentApplication.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('fullName course status createdAt');

        const recentTrainers = await TrainerApplication.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('fullName expertise status createdAt');

        const recentBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title status createdAt')
            .populate('author', 'name');

        res.json({
            recentStudents,
            recentTrainers,
            recentBlogs
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Manage users (list, create, update roles)
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin only)
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all cohorts with status
// @route   GET /api/admin/cohorts
// @access  Private (Admin only)
const getAllCohorts = async (req, res) => {
    try {
        const cohorts = await Cohort.find()
            .sort({ startDate: -1 })
            .select('title startDate endDate currentEnrollment maxStudents isActive status isWaitlistEnabled');
        
        res.json(cohorts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cohorts', error: error.message });
    }
};

// @desc    Update cohort activation status
// @route   PUT /api/admin/cohorts/:id/activation
// @access  Private (Admin only)
const updateCohortActivation = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        // If trying to activate this cohort, deactivate all other cohorts first
        if (isActive) {
            await Cohort.updateMany(
                { _id: { $ne: id } },
                { $set: { isActive: false } }
            );
        }

        // Update the target cohort
        const updatedCohort = await Cohort.findByIdAndUpdate(
            id,
            { isActive },
            { new: true, runValidators: true }
        );

        if (!updatedCohort) {
            return res.status(404).json({ message: 'Cohort not found' });
        }

        res.json(updatedCohort);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cohort activation status', error: error.message });
    }
};

// @desc    Update cohort details
// @route   PUT /api/admin/cohorts/:id
// @access  Private (Admin only)
const updateCohort = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find the cohort first to ensure it exists
        const cohort = await Cohort.findById(id);
        if (!cohort) {
            return res.status(404).json({ message: 'Cohort not found' });
        }

        // If updating waitlist status, check capacity
        if ('isWaitlistEnabled' in updates) {
            if (!updates.isWaitlistEnabled && cohort.isAtCapacity) {
                return res.status(400).json({ 
                    message: 'Cannot disable waitlist while cohort is at capacity' 
                });
            }
        }

        // Update the cohort
        const updatedCohort = await Cohort.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        res.json(updatedCohort);
    } catch (error) {
        console.error('Error updating cohort:', error);
        res.status(500).json({ 
            message: 'Error updating cohort', 
            error: error.message 
        });
    }
};

module.exports = {
    getDashboardStats,
    getRecentActivities,
    getUsers,
    updateUserRole,
    getAllCohorts,
    updateCohortActivation,
    updateCohort
};