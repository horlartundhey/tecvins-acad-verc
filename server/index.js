const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./src/config/db');
const fileUpload = require('express-fileupload');

// Route imports
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const studentRoutes = require('./src/routes/student');
const trainerRoutes = require('./src/routes/trainer');
const adminRoutes = require('./src/routes/admin');
const contactRoutes = require('./src/routes/contact');
const partnerRoutes = require('./src/routes/partner');
const newsletterRoutes = require('./src/routes/newsletter');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Basic route for API health check
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});