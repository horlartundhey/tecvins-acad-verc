const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
let errorLog, uploadLog, infoLog;

try {
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }    // Create write streams for different log types
    errorLog = fs.createWriteStream(path.join(logsDir, 'error.log'), { flags: 'a' });
    errorLog.on('error', (error) => {
        console.error('Error writing to error log:', error);
    });

    uploadLog = fs.createWriteStream(path.join(logsDir, 'upload.log'), { flags: 'a' });
    uploadLog.on('error', (error) => {
        console.error('Error writing to upload log:', error);
    });

    // Create info log stream for general application logs
    infoLog = fs.createWriteStream(path.join(logsDir, 'app.log'), { flags: 'a' });
    infoLog.on('error', (error) => {
        console.error('Error writing to info log:', error);
    });
} catch (err) {
    console.error('Error initializing logger:', err);
}

const formatMessage = (message, data = {}) => {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${message}\n${JSON.stringify(data, null, 2)}\n\n`;
};

const logger = {
    error: (message, error = {}) => {
        try {
            let logData = error;
            if (error instanceof Error) {
                logData = { message: error.message, stack: error.stack };
            }
            const logMessage = formatMessage(message, logData);
            errorLog.write(logMessage);
            console.error(logMessage);
        } catch (e) {
            console.error('Error in logger.error:', e);
            // Fallback to console.error
            console.error(message, error);
        }
    },
      info: (message, data = {}) => {
        try {
            const logMessage = formatMessage(message, data);
            infoLog.write(logMessage);
            console.log(logMessage);
        } catch (e) {
            console.error('Error in logger.info:', e);
            // Fallback to console.log
            console.log(message, data);
        }
    },

    warn: (message, data = {}) => {
        try {
            const logMessage = formatMessage(message, data);
            console.warn(logMessage);
        } catch (e) {
            console.error('Error in logger.warn:', e);
            // Fallback to console.warn
            console.warn(message, data);
        }
    },

    debug: (message, data = {}) => {
        try {
            const logMessage = formatMessage(message, data);
            console.debug(logMessage);
        } catch (e) {
            console.error('Error in logger.debug:', e);
            // Fallback to console.debug
            console.debug(message, data);
        }
    },
    
    upload: (message, data = {}) => {
        try {
            const logMessage = formatMessage(message, data);
            uploadLog.write(logMessage);
            console.log(logMessage);
        } catch (e) {
            console.error('Error in logger.upload:', e);
            // Fallback to console.log
            console.log(message, data);
        }
    }
};

module.exports = logger;
