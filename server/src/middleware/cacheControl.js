const cacheControl = (req, res, next) => {
    // Set strong cache headers
    res.set('Cache-Control', 'private, must-revalidate, max-age=30');
    res.set('ETag', `W/"${Date.now().toString(36)}"`);
    
    // Handle conditional GET requests
    const ifNoneMatch = req.get('If-None-Match');
    const ifModifiedSince = req.get('If-Modified-Since');
    
    if (ifNoneMatch || ifModifiedSince) {
        const lastModified = ifModifiedSince ? new Date(ifModifiedSince) : null;
        const now = new Date();
        
        if ((lastModified && (now.getTime() - lastModified.getTime()) < 30000)) {
            res.status(304).end();
            return;
        }
    }
    
    next();
};

module.exports = cacheControl;
