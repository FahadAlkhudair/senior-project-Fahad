const cronJob = require('node-cron');
const db = require('./models');
const { refreshToken: RefreshToken } = db;

const refreshTokenCleaner = cronJob.schedule("0 30 * * * *", () => {
    console.log("Removing tokens");
    try {
        var expiry = new Date();
        RefreshToken.deleteMany({ expiryDate: { $lt: expiry } });
    } catch (error) {
        console.error(error);
    }
});

exports.initScheduledJobs = () => {
    refreshTokenCleaner.start();
};
