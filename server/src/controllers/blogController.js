const Blog = require('../models/Blog');
const { deleteFromCloudinary } = require('../utils/cloudinary');
const logger = require('../utils/logger');

// Helper function to generate a unique slug
const generateUniqueSlug = async (baseSlug) => {
    // Try the base slug first
    let slugToTry = baseSlug;
    let slugExists = await Blog.exists({ slug: slugToTry });
    
    // If the slug exists, append a timestamp
    if (slugExists) {
        slugToTry = `${baseSlug}-${Date.now()}`;
    }
    
    return slugToTry;
};

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private (Admin/Editor)
const createBlog = async (req, res) => {
    try {
        logger.upload('Blog creation started', {
            body: req.body,
            headers: req.headers
        });

        const { title, content, tags, status, featuredImage } = req.body;

        if (!title) {
            logger.error('Blog creation failed - Title missing', { body: req.body });
            return res.status(400).json({ message: 'Title is required' });
        }

        // Generate base slug from title
        const baseSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/-+/g, '-')         // Replace multiple hyphens with single hyphen
            .replace(/^-|-$/g, '');      // Remove hyphens from start and end
            
        // Generate a unique slug
        const slug = await generateUniqueSlug(baseSlug);

        // Parse tags - handle all possible formats
        let parsedTags = [];
        try {
            if (typeof tags === 'string') {
                if (tags.startsWith('[')) {
                    parsedTags = JSON.parse(tags);
                } else {
                    parsedTags = tags.split(',').map(tag => tag.trim()).filter(Boolean);
                }
            } else if (Array.isArray(tags)) {
                parsedTags = tags;
            }        } catch (e) {
            console.error('Error parsing tags:', e);
            parsedTags = [];
        }

        // The featuredImage is already processed by the formidable middleware
        const featuredImageData = featuredImage;
        const blogData = {
            title,
            content,
            tags: parsedTags,
            status: status || 'draft',
            slug,
            featuredImage: featuredImageData,
            author: req.user._id // User ID is available from auth middleware
        };

        console.log('Attempting to create blog with data:', {
            ...blogData,
            content: blogData.content?.substring(0, 100) + '...',
        });        const blog = await Blog.create(blogData);
        
        // Populate the author information before sending response
        const populatedBlog = await Blog.findById(blog._id)
            .populate({
                path: 'author',
                select: 'name email',
                model: 'User'
            });
        
        res.status(201).json(populatedBlog);

    } catch (error) {
        console.error('Blog creation error:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).reduce((acc, key) => {
                    acc[key] = error.errors[key].message;
                    return acc;
                }, {})
            });
        }

        res.status(500).json({ 
            message: 'Failed to create blog post', 
            error: error.message 
        });
    }
};

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {    try {
        let query = {};
        
        // For non-admin/editor users or when not logged in, only show published posts
        if (!req.user || !['admin', 'editor'].includes(req.user.role)) {
            query.status = 'published';
        }
        
        // If status filter is provided and user is admin/editor, apply it
        if (req.query.status && req.user && ['admin', 'editor'].includes(req.user.role)) {
            query.status = req.query.status;
        }        const blogs = await Blog.find(query)
            .populate({
                path: 'author',
                select: 'name email',
                model: 'User'
            })
            .sort({ createdAt: -1 });

        // Set cache control headers
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Expires', '0');
        res.set('Pragma', 'no-cache');
        
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate('author', 'name');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin/Editor)
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if user is author or admin
        if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this blog' });
        }        const { title, content, tags, status, featuredImage } = req.body;

        // Update basic fields
        if (title) {
            blog.title = title;
            // Update slug if title changes
            blog.slug = title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        }
        
        if (content) blog.content = content;
        if (status) blog.status = status;

        // Handle tags parsing
        if (tags) {
            let parsedTags = [];
            try {
                if (typeof tags === 'string') {
                    if (tags.startsWith('[')) {
                        parsedTags = JSON.parse(tags);
                    } else {
                        parsedTags = tags.split(',').map(tag => tag.trim()).filter(Boolean);
                    }
                } else if (Array.isArray(tags)) {
                    parsedTags = tags;
                }
            } catch (e) {
                console.error('Error parsing tags:', e);
                parsedTags = [];
            }
            blog.tags = parsedTags;
        }

        // Handle image update - featuredImage is processed by formidable middleware
        if (featuredImage) {
            try {
                // Delete old image from Cloudinary if it exists
                if (blog.featuredImage?.public_id) {
                    await deleteFromCloudinary(blog.featuredImage.public_id);
                }
                
                // Update with new image data
                blog.featuredImage = featuredImage;
            } catch (error) {
                return res.status(500).json({ message: 'Image update failed', error: error.message });
            }
        }        const updatedBlog = await blog.save();
        
        // Populate the author information before sending response
        const populatedBlog = await Blog.findById(updatedBlog._id)
            .populate({
                path: 'author',
                select: 'name email',
                model: 'User'
            });
        
        res.json(populatedBlog);
    } catch (error) {
        console.error('Blog update error:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).reduce((acc, key) => {
                    acc[key] = error.errors[key].message;
                    return acc;
                }, {})
            });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin/Editor)
const deleteBlog = async (req, res) => {
    try {        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if user is author or admin
        if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this blog' });
        }

        // Delete associated image from Cloudinary if it exists
        if (blog.featuredImage && blog.featuredImage.public_id) {
            try {
                await deleteFromCloudinary(blog.featuredImage.public_id);
            } catch (error) {
                console.error('Error deleting image from Cloudinary:', error);
                // Continue with blog deletion even if image deletion fails
            }
        }

        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all drafts (for admin/editor)
// @route   GET /api/blogs/drafts
// @access  Private (Admin/Editor)
const getDrafts = async (req, res) => {
    try {
        const query = { status: 'draft' };
        // If not admin, only show own drafts
        if (req.user.role !== 'admin') {
            query.author = req.user._id;
        }
        
        const drafts = await Blog.find(query)
            .populate('author', 'name')
            .sort({ createdAt: -1 });
        res.json(drafts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
    getDrafts
};