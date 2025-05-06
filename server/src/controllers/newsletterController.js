const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if already subscribed
        let subscriber = await Newsletter.findOne({ email });
        
        if (subscriber) {
            if (subscriber.isSubscribed) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is already subscribed to our newsletter.'
                });
            } else {
                subscriber.isSubscribed = true;
                await subscriber.save();
                return res.json({
                    success: true,
                    message: 'Welcome back! You have been resubscribed to our newsletter.'
                });
            }
        }

        // Create new subscription
        subscriber = await Newsletter.create({ email });
        res.status(201).json({
            success: true,
            message: 'Thank you for subscribing to our newsletter!',
            data: subscriber
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to subscribe. Please try again.',
            error: error.message
        });
    }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
const unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;
        const subscriber = await Newsletter.findOneAndUpdate(
            { email },
            { isSubscribed: false },
            { new: true }
        );

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Email not found in our subscription list.'
            });
        }

        res.json({
            success: true,
            message: 'You have been successfully unsubscribed.',
            data: subscriber
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to unsubscribe. Please try again.',
            error: error.message
        });
    }
};

// @desc    Get all subscribers
// @route   GET /api/newsletter/subscribers
// @access  Private (Admin)
const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find({ isSubscribed: true })
            .sort({ subscribedAt: -1 });
        
        res.json({
            success: true,
            data: subscribers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch subscribers',
            error: error.message
        });
    }
};

module.exports = {
    subscribe,
    unsubscribe,
    getSubscribers
};