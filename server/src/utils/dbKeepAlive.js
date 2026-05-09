const cron = require('node-cron');
const mongoose = require('mongoose');

/**
 * DB Keep-Alive
 * Runs a lightweight ping against MongoDB every 10 minutes to prevent
 * Atlas free-tier clusters from going dormant and pausing activity.
 */
const startKeepAlive = () => {
    // Every 10 minutes: "0,10,20,30,40,50 * * * *"
    cron.schedule('*/10 * * * *', async () => {
        try {
            if (mongoose.connection.readyState !== 1) {
                console.log('[KeepAlive] DB not connected — skipping ping');
                return;
            }
            // Lightweight admin ping — does not read/write any collection
            await mongoose.connection.db.admin().ping();
            console.log(`[KeepAlive] DB ping OK — ${new Date().toISOString()}`);
        } catch (err) {
            console.error('[KeepAlive] DB ping failed:', err.message);
        }
    });

    console.log('[KeepAlive] Scheduled — pinging DB every 10 minutes');
};

module.exports = startKeepAlive;
