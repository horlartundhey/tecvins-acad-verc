const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },    featuredImage: {
        url: {
            type: String  // Cloudinary secure URL
        },
        public_id: {
            type: String  // Cloudinary public ID for deletion
        }
    },
    tags: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
});

// No pre-save middleware needed as slug is handled in controller

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;