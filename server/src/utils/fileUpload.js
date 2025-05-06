const multer = require('multer');
const path = require('path');

// Configure storage for different file types
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'uploads/';
        
        if (file.fieldname === 'resume') {
            uploadPath += 'resumes/';
        } else if (file.fieldname === 'featuredImage') {
            uploadPath += 'blog-images/';
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'resume') {
        // Allow PDFs and DOCs for resumes
        if (file.mimetype === 'application/pdf' || 
            file.mimetype === 'application/msword' || 
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF and DOC files are allowed.'), false);
        }
    } else if (file.fieldname === 'featuredImage') {
        // Allow images for blog featured images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only image files are allowed.'), false);
        }
    } else {
        cb(new Error('Invalid field name'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;