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
    },
    featuredImage: {
        type: String,  // URL to the image
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

// Create URL-friendly slug from title before saving
blogSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    next();
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;