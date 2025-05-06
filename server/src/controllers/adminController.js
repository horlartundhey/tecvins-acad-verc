const StudentApplication = require('../models/StudentApplication');
const TrainerApplication = require('../models/TrainerApplication');
const User = require('../models/User');
const Blog = require('../models/Blog');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
    try {
        const stats = {
            students: {
                total: await StudentApplication.countDocuments(),
                pending: await StudentApplication.countDocuments({ status: 'pending' }),
                approved: await StudentApplication.countDocuments({ status: 'approved' }),
                rejected: await StudentApplication.countDocuments({ status: 'rejected' })
            },
            trainers: {
                total: await TrainerApplication.countDocuments(),
                pending: await TrainerApplication.countDocuments({ status: 'pending' }),
                approved: await TrainerApplication.countDocuments({ status: 'approved' }),
                rejected: await TrainerApplication.countDocuments({ status: 'rejected' })
            },
            blogs: {
                total: await Blog.countDocuments(),
                published: await Blog.countDocuments({ status: 'published' }),
                draft: await Blog.countDocuments({ status: 'draft' })
            },
            users: {
                total: await User.countDocuments(),
                admins: await User.countDocuments({ role: 'admin' }),
                editors: await User.countDocuments({ role: 'editor' })
            }
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
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

module.exports = {
    getDashboardStats,
    getRecentActivities,
    getUsers,
    updateUserRole
};