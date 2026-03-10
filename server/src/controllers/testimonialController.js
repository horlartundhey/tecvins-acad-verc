const Testimonial = require('../models/Testimonial');

// @desc    Get all active testimonials (public)
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
    try {
        const { program } = req.query;
        let query = { isActive: true };
        if (program && program !== 'all') query.program = program;

        const testimonials = await Testimonial.find(query)
            .sort({ displayOrder: 1, createdAt: -1 });

        res.json({ success: true, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Get all testimonials including inactive (admin)
// @route   GET /api/testimonials/admin
// @access  Private (Admin)
const getAllTestimonialsAdmin = async (req, res) => {
    try {
        const testimonials = await Testimonial.find()
            .sort({ displayOrder: 1, createdAt: -1 });

        res.json({ success: true, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Private (Admin)
const createTestimonial = async (req, res) => {
    try {
        const { name, title, image, videoUrl, quote, program, displayOrder } = req.body;

        if (!name || !title || !image || !videoUrl || !quote || !quote.length) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, title, image, videoUrl, and at least one quote'
            });
        }

        const testimonial = await Testimonial.create({
            name,
            title,
            image,
            videoUrl,
            quote: Array.isArray(quote) ? quote : [quote],
            program: program || 'all',
            displayOrder: displayOrder || 0
        });

        res.status(201).json({ success: true, data: testimonial, message: 'Testimonial created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create testimonial', error: error.message });
    }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin)
const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }

        res.json({ success: true, data: testimonial, message: 'Testimonial updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update testimonial', error: error.message });
    }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }

        res.json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete testimonial', error: error.message });
    }
};

// @desc    Toggle active status
// @route   PATCH /api/testimonials/:id/toggle
// @access  Private (Admin)
const toggleTestimonialStatus = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }

        testimonial.isActive = !testimonial.isActive;
        await testimonial.save();

        res.json({
            success: true,
            data: testimonial,
            message: `Testimonial ${testimonial.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to toggle status', error: error.message });
    }
};

module.exports = {
    getTestimonials,
    getAllTestimonialsAdmin,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialStatus
};
