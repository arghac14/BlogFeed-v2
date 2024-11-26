const jwt = require('jsonwebtoken');

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        // Verify token using JWT_SECRET
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid Token' });
            }
            req.user = user; // Attach user info to request
            next(); // Continue to the next middleware or route handler
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = authenticateToken;