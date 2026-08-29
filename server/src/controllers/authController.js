const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const ALLOWED_ROLES = ['admin', 'editor'];

// A valid bcrypt hash of a value nobody can guess. Compared against when the
// email is unknown so a failed login costs the same time either way - without
// it, response timing tells an attacker which emails have accounts.
const DUMMY_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Private (Admin) - accounts are created by administrators, not self-service
const registerUser = async (req, res) => {
    try {
        const { name, password, role } = req.body;
        const email = String(req.body.email || '').trim().toLowerCase();

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required.' });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        if (String(password).length < MIN_PASSWORD_LENGTH) {
            return res.status(400).json({
                message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
            });
        }

        // Never take the role straight from the request body - only an
        // explicitly allowed value, and only because this route is admin-only
        if (role && !ALLOWED_ROLES.includes(role)) {
            return res.status(400).json({ message: 'Invalid role.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'editor'
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { password } = req.body;
        const email = String(req.body.email || '').trim();

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });

        // Always run a comparison, even when the email is unknown, so the
        // response takes the same time whether or not the account exists
        const isMatch = user
            ? await user.matchPassword(password)
            : await bcrypt.compare(password, DUMMY_HASH);

        if (!user || !isMatch) {
            // Deliberately identical for "no such email" and "wrong password"
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
