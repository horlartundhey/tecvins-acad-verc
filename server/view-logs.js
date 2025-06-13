const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, 'logs');
const errorLogPath = path.join(logsDir, 'error.log');
const appLogPath = path.join(logsDir, 'app.log');

console.log('='.repeat(80));
console.log('TECVINSON ACADEMY - LOG VIEWER');
console.log('='.repeat(80));

function readLogFile(filePath, logType) {
    if (fs.existsSync(filePath)) {
        console.log(`\n📄 ${logType} LOG:\n`);
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.trim()) {
            // Get the last 50 lines for readability
            const lines = content.split('\n');
            const lastLines = lines.slice(-50);
            console.log(lastLines.join('\n'));
        } else {
            console.log('(Log file is empty)');
        }
    } else {
        console.log(`\n❌ ${logType} log file not found: ${filePath}`);
    }
}

// Read error logs
readLogFile(errorLogPath, 'ERROR');

// Read app logs
readLogFile(appLogPath, 'APP INFO');

console.log('\n' + '='.repeat(80));
console.log('End of logs. To view live logs, you can use:');
console.log('- tail -f logs/error.log');
console.log('- tail -f logs/app.log');
console.log('='.repeat(80));

// Watch for new log entries if --watch flag is provided
if (process.argv.includes('--watch')) {
    console.log('\n🔍 Watching for new log entries... (Press Ctrl+C to stop)');
    
    if (fs.existsSync(errorLogPath)) {
        fs.watchFile(errorLogPath, (curr, prev) => {
            if (curr.mtime > prev.mtime) {
                console.log('\n🚨 NEW ERROR LOG ENTRY:');
                const content = fs.readFileSync(errorLogPath, 'utf8');
                const lines = content.split('\n');
                // Show last few lines
                console.log(lines.slice(-5).join('\n'));
            }
        });
    }
    
    if (fs.existsSync(appLogPath)) {
        fs.watchFile(appLogPath, (curr, prev) => {
            if (curr.mtime > prev.mtime) {
                console.log('\n📝 NEW APP LOG ENTRY:');
                const content = fs.readFileSync(appLogPath, 'utf8');
                const lines = content.split('\n');
                // Show last few lines
                console.log(lines.slice(-5).join('\n'));
            }
        });
    }
}
