const Blog = require('../models/Blog');

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private (Admin/Editor)
const createBlog = async (req, res) => {
    try {
        const { title, content, tags, featuredImage } = req.body;
        const blog = await Blog.create({
            title,
            content,
            tags,
            featuredImage,
            author: req.user._id,
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'published' })
            .populate('author', 'name')
            .sort({ createdAt: -1 });
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
        }

        const { title, content, tags, featuredImage, status } = req.body;
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.tags = tags || blog.tags;
        blog.featuredImage = featuredImage || blog.featuredImage;
        blog.status = status || blog.status;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin/Editor)
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if user is author or admin
        if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this blog' });
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