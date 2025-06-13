const Blog = require('../models/Blog');
const mongoose = require('mongoose');

const blogs = [
    {
        title: 'Getting Started with Python Programming',
        content: 'Python is one of the most popular programming languages... [content truncated]',
        author: new mongoose.Types.ObjectId(), // This will be updated in the seeder with actual user ID
        featuredImage: 'https://example.com/images/python-intro.jpg',
        tags: ['Python', 'Programming', 'Beginners'],
        status: 'published',
        slug: 'getting-started-with-python-programming'
    },
    {
        title: 'The Journey to Becoming a Full Stack Developer',
        content: 'Full stack development is an exciting career path... [content truncated]',
        author: new mongoose.Types.ObjectId(),
        featuredImage: 'https://example.com/images/fullstack.jpg',
        tags: ['Web Development', 'Career', 'Full Stack'],
        status: 'published',
        slug: 'journey-to-becoming-full-stack-developer'
    },
    {
        title: 'DevOps Best Practices for 2025',
        content: 'In the ever-evolving world of DevOps... [content truncated]',
        author: new mongoose.Types.ObjectId(),
        featuredImage: 'https://example.com/images/devops.jpg',
        tags: ['DevOps', 'Best Practices', 'Cloud'],
        status: 'draft',
        slug: 'devops-best-practices-2025'
    }
];

const seedBlogs = async (adminUserId) => {
    try {
        // Clear existing blogs
        await Blog.deleteMany({});
        
        // Set the admin user as the author for all blog posts
        const blogsWithAuthor = blogs.map(blog => ({
            ...blog,
            author: adminUserId
        }));
        
        // Create new blogs
        await Blog.insertMany(blogsWithAuthor);
        console.log('Blogs seeded successfully');
    } catch (error) {
        console.error('Error seeding blogs:', error);
        throw error;
    }
};

module.exports = seedBlogs;
