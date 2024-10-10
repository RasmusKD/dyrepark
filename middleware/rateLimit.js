const rateLimit = require('express-rate-limit');

// Rate limiting middleware
exports.limitRequests = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // Limit each IP to 10 requests
    message: 'Too many requests, please try again later.'
});
