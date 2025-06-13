const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Missing Cloudinary configuration. Please check your .env file.');
    console.log('Available environment variables:', Object.keys(process.env).filter(key => !key.toLowerCase().includes('secret')));
    throw new Error('Missing Cloudinary configuration');
}

// Configure cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Log Cloudinary configuration (without sensitive data)
console.log('Cloudinary Configuration:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    hasApiKey: !!process.env.CLOUDINARY_API_KEY,
    hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
});

// Upload file to Cloudinary
const uploadToCloudinary = async (file) => {
    try {
        if (!file.filepath && !file.buffer) {
            throw new Error('No file content provided');
        }

        if (!file.mimetype?.startsWith('image/')) {
            throw new Error('Invalid file type. Only images are allowed.');
        }

        // Prepare upload options
        const uploadOptions = {
            folder: 'blog-images',
            resource_type: 'auto',
            timeout: 120000, // 120 seconds timeout
            transformation: {
                quality: 'auto:good',
                fetch_format: 'auto',
                width: 1200,
                height: 1200,
                crop: 'limit',
                dpr: 'auto'
            },
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            format: 'webp' // Convert all images to WebP for better compression
        };        let uploadResult;
        if (file.filepath) {
            // Upload from file path
            uploadResult = await cloudinary.uploader.upload(file.filepath, uploadOptions);
        } else {
            // Upload from buffer
            const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            uploadResult = await cloudinary.uploader.upload(fileStr, uploadOptions);
        }        return {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
        };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image');
    }
};

// Delete file from Cloudinary
const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) return;
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
};
