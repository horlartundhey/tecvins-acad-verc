const dotenv = require('dotenv');
// Load environment variables before other imports
dotenv.config({ path: '.env' });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./src/config/db');
// Route imports
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const studentRoutes = require('./src/routes/student');
const trainerRoutes = require('./src/routes/trainer');
const adminRoutes = require('./src/routes/admin');
const contactRoutes = require('./src/routes/contact');
const partnerRoutes = require('./src/routes/partner');
const newsletterRoutes = require('./src/routes/newsletter');
const waitlistRoutes = require('./src/routes/waitlistRoutes');
const cohortRoutes = require('./src/routes/cohort');
const donationRoutes = require('./src/routes/donation');
const hireRequestRoutes = require('./src/routes/hireRequest');
const testimonialRoutes = require('./src/routes/testimonial');
const settingsRoutes = require('./src/routes/settings');

const app = express();

// Allowed origins
const allowedOrigins = [
    'https://tecvinsonacademy.com',
    'https://www.tecvinsonacademy.com',
    'http://localhost:5173',
    'http://localhost:3000',
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin ${origin} not allowed`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

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
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/cohorts', cohortRoutes);
app.use('/api/donate', donationRoutes);
app.use('/api/hire-requests', hireRequestRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);

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