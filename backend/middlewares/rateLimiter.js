// 🔒 RATE LIMITING MIDDLEWARE (Updated with 2FA Support & CAPTCHA Integration)
// Location: backend/middlewares/rateLimiter.js

const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

exports.globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});


exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // ✅ Increased from 10 to 15 to allow CAPTCHA retries
    skipSuccessfulRequests: true, // Don't count successful logins
    message: {
        success: false,
        message: "Too many login attempts from this IP. Please try again after 15 minutes.",
        rateLimited: true
    },
    handler: (req, res) => {
        // Log suspicious activity
        console.warn(`🚨 RATE LIMIT EXCEEDED: IP ${req.ip} attempted too many logins`);

        res.status(429).json({
            success: false,
            message: "Too many login attempts. Your IP has been temporarily blocked.",
            rateLimited: true,
            retryAfter: 15 // minutes
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});


exports.createAccountLoginLimiter = () => {
    const loginAttempts = new Map(); // Store: email -> { count, resetTime }

    return (req, res, next) => {
        const email = req.body.email;

        if (!email) {
            return next();
        }

        const now = Date.now();
        const maxAttempts = 12; // ✅ Increased from 5 to 12 to allow CAPTCHA attempts
        const windowMs = 15 * 60 * 1000; // 15 minutes

        let attemptRecord = loginAttempts.get(email);

        if (!attemptRecord || now > attemptRecord.resetTime) {
            attemptRecord = {
                count: 0,
                resetTime: now + windowMs
            };
        }
        if (attemptRecord.count >= maxAttempts) {
            const minutesRemaining = Math.ceil((attemptRecord.resetTime - now) / 60000);

            console.warn(`🚨 ACCOUNT RATE LIMIT: ${email} exceeded login attempts`);

            return res.status(429).json({
                success: false,
                message: `Too many login attempts for this account. Try again in ${minutesRemaining} minutes.`,
                rateLimited: true,
                retryAfter: minutesRemaining,
                requiresCaptcha: true
            });
        }
        attemptRecord.count++;
        loginAttempts.set(email, attemptRecord);
        if (loginAttempts.size > 10000) {
            const entries = Array.from(loginAttempts.entries());
            entries.forEach(([key, value]) => {
                if (now > value.resetTime) {
                    loginAttempts.delete(key);
                }
            });
        }

        next();
    };
};


exports.registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: {
        success: false,
        message: "Too many accounts created from this IP. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});


exports.passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, 
    message: {
        success: false,
        message: "Too many password reset requests. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});


exports.createStrictRateLimiter = (options = {}) => {
    return rateLimit({
        windowMs: options.windowMs || 15 * 60 * 1000, 
        max: options.max || 10, 
        message: options.message || "Too many attempts. Please try again later.",
        standardHeaders: true,
        legacyHeaders: false,
        skipSuccessfulRequests: options.skipSuccessfulRequests || false,
        handler: (req, res) => {
            console.warn(`🚨 2FA RATE LIMIT EXCEEDED: IP ${req.ip} on ${req.path}`);

            res.status(429).json({
                success: false,
                message: options.message || "Too many attempts. Please try again later.",
                rateLimited: true,
                retryAfter: Math.ceil((options.windowMs || 15 * 60 * 1000) / 60000) // in minutes
            });
        }
    });
};


exports.twoFAVerificationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: {
        success: false,
        message: "Too many 2FA verification attempts. Please try again later."
    },
    handler: (req, res) => {
        console.warn(`🚨 2FA VERIFICATION RATE LIMIT: IP ${req.ip}, User ${req.body.userId || 'unknown'}`);

        res.status(429).json({
            success: false,
            message: "Too many 2FA verification attempts. Please try again after 15 minutes.",
            rateLimited: true,
            retryAfter: 15
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});

exports.twoFASetupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Max 10 setup attempts per hour
    message: {
        success: false,
        message: "Too many 2FA setup attempts. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

exports.addRateLimitInfo = (req, res, next) => {
    res.on('finish', () => {
        if (res.getHeader('RateLimit-Remaining')) {
            const remaining = res.getHeader('RateLimit-Remaining');
            if (remaining < 10) {
                console.warn(`⚠️ Low rate limit remaining for IP ${req.ip}: ${remaining} requests left`);
            }
        }
    });
    next();
};