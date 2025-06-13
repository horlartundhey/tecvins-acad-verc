const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const {
    createBlog,
    getBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
    getDrafts
} = require('../controllers/blogController');
const uploadMiddleware = require('../utils/formidableUpload');

// Public routes
router.get('/', getBlogs);
router.get('/post/:slug', getBlogBySlug);

// Protected routes (Admin/Editor only)
router.post('/', protect, checkRole(['admin', 'editor']), uploadMiddleware, createBlog);
router.put('/:id', protect, checkRole(['admin', 'editor']), uploadMiddleware, updateBlog);
router.delete('/:id', protect, checkRole(['admin', 'editor']), deleteBlog);
router.get('/drafts', protect, checkRole(['admin', 'editor']), getDrafts);

module.exports = router;