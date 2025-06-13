const multer = require('multer');
const path = require('path');
const logger = require('./logger');

// Configure multer to store files in memory for Cloudinary upload
const storage = multer.memoryStorage();

// Function to check if file type is allowed
const isValidFileType = (file) => {
    if (file.fieldname === 'resume') {
        return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.mimetype);
    } else if (file.fieldname === 'featuredImage') {
        return file.mimetype.startsWith('image/');
    }
    return false;
};

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
        fileSize: 5 * 1024 * 1024, // 5MB limit
        fieldSize: 10 * 1024 * 1024, // 10MB field size limit
        files: 1, // Only allow 1 file
        parts: 10 // Limit number of parts (fields + files)
    }
}).single('featuredImage');

// Wrap multer middleware to handle errors
const uploadMiddleware = (req, res, next) => {
    logger.upload('Starting file upload process', {
        contentType: req.headers['content-type'],
        contentLength: req.headers['content-length']
    });

    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                logger.error('File size limit exceeded', { error: err });
                return res.status(400).json({
                    message: 'File too large. Maximum size is 5MB.',
                    error: 'LIMIT_FILE_SIZE'
                });
            }
            logger.error('Multer error during upload', { error: err });
            return res.status(400).json({
                message: 'File upload error',
                error: err.message
            });
        } else if (err) {
            logger.error('Unknown error during upload', { error: err });
            return res.status(500).json({
                message: 'Unknown error during file upload',
                error: err.message
            });
        }

        // Log successful file upload
        if (req.file) {
            logger.upload('File upload successful', {
                mimetype: req.file.mimetype,
                size: req.file.size,
                originalname: req.file.originalname
            });
        }

        next();
    });
};

// Function to handle file upload and return Cloudinary URL and public_id
const { uploadToCloudinary } = require('./cloudinary');

const uploadFile = async (file) => {
    if (!file) {
        logger.error('No file provided for upload');
        throw new Error('No file provided');
    }

    if (!file.buffer || !file.mimetype) {
        logger.error('Invalid file object', { file: { ...file, buffer: file.buffer ? 'exists' : 'missing' } });
        throw new Error('Invalid file object');
    }

    try {
        logger.upload('Attempting to upload file to Cloudinary', {
            mimetype: file.mimetype,
            size: file.size,
            originalName: file.originalname
        });

        // Upload to Cloudinary
        const result = await uploadToCloudinary(file);
        
        logger.upload('Successfully uploaded file to Cloudinary', {
            public_id: result.public_id,
            url: result.url
        });

        return result;
    } catch (error) {
        logger.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

module.exports = uploadMiddleware;
module.exports.uploadFile = uploadFile;