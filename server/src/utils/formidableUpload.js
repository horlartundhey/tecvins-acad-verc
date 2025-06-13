const formidable = require('formidable');
const { uploadToCloudinary, deleteFromCloudinary } = require('./cloudinary');
const logger = require('./logger');

const uploadMiddleware = async (req, res, next) => {
    // Only process multipart form data
    if (!req.headers['content-type']?.includes('multipart/form-data')) {
        return next();
    }

    // Configure formidable
    const form = new formidable.IncomingForm({
        maxFileSize: 5 * 1024 * 1024, // 5MB
        keepExtensions: true,
        multiples: false,
        uploadDir: 'tmp',
        filter: function({ name, originalFilename, mimetype }) {
            // Keep only image files
            return mimetype && mimetype.includes('image');
        }
    });try {
        // Parse the form
        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve([fields, files]);
            });
        });
        
        // Log the received data
        logger.upload('Form data received', {
            fields,
            files
        });        // Get the uploaded file
        const file = Array.isArray(files.featuredImage) 
            ? files.featuredImage[0] 
            : files.featuredImage;

        if (!file) {
            // No file uploaded, continue without file
            req.body = Object.fromEntries(
                Object.entries(fields).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
            );
            return next();
        }
        
        // Validate file type
        if (!file.mimetype || !file.mimetype.startsWith('image/')) {
            logger.error('Invalid file type', { 
                mimetype: file.mimetype, 
                filename: file.originalFilename 
            });
            return res.status(400).json({
                message: 'Invalid file type. Only images are allowed.'
            });
        }

        try {
            // Upload to Cloudinary
            const cloudinaryResult = await uploadToCloudinary({
                filepath: file.filepath,
                mimetype: file.mimetype
            });            // Process fields (convert arrays to single values)
            const processedFields = Object.fromEntries(
                Object.entries(fields).map(([key, value]) => {
                    let processedValue = Array.isArray(value) ? value[0] : value;
                    // Remove extra quotes if present
                    if (typeof processedValue === 'string' && processedValue.startsWith('"') && processedValue.endsWith('"')) {
                        processedValue = processedValue.slice(1, -1);
                    }
                    return [key, processedValue];
                })
            );

            // Add the file info to the request
            req.body = {
                ...processedFields,
                featuredImage: {
                    url: cloudinaryResult.url,
                    public_id: cloudinaryResult.public_id
                }
            };

            logger.upload('File successfully processed', {
                filename: file.originalFilename,
                size: file.size,
                type: file.mimetype
            });

            next();
        } catch (error) {
            logger.error('Upload to Cloudinary failed:', error);
            return res.status(500).json({
                message: 'Failed to upload image',
                error: error.message
            });
        }
    } catch (error) {
        logger.error('Form parsing error:', error);
        return res.status(400).json({
            message: 'Error processing form data',
            error: error.message
        });
    }
};

module.exports = uploadMiddleware;
