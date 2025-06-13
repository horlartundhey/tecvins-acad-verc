const logger = require('../utils/logger');

// Middleware to log all waitlist-related requests
const waitlistLogger = (req, res, next) => {
    // Only log waitlist related routes
    if (req.path.includes('waitlist')) {
        const requestInfo = {
            method: req.method,
            url: req.originalUrl,
            path: req.path,
            headers: {
                'content-type': req.get('Content-Type'),
                'user-agent': req.get('User-Agent'),
                'origin': req.get('Origin'),
                'referer': req.get('Referer')
            },
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip || req.connection.remoteAddress,
            timestamp: new Date().toISOString()
        };

        logger.info('Waitlist API Request', requestInfo);

        // Capture the original res.json to log responses
        const originalJson = res.json;
        res.json = function(data) {
            logger.info('Waitlist API Response', {
                statusCode: res.statusCode,
                data: data,
                timestamp: new Date().toISOString(),
                requestPath: req.path,
                requestMethod: req.method
            });
            return originalJson.call(this, data);
        };

        // Capture errors
        const originalSend = res.send;
        res.send = function(data) {
            if (res.statusCode >= 400) {
                logger.error('Waitlist API Error Response', {
                    statusCode: res.statusCode,
                    data: data,
                    timestamp: new Date().toISOString(),
                    requestPath: req.path,
                    requestMethod: req.method,
                    requestBody: req.body
                });
            }
            return originalSend.call(this, data);
        };
    }
    
    next();
};

module.exports = waitlistLogger;
