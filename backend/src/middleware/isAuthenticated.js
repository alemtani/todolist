const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/authConfig');

/* Authentication middleware */
function isAuthenticated(req, res, next) {    
    // Retrieve the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token, returning the decoded user if successful
        const decodedUser = jwt.verify(token, jwtSecret);
        // Attach the user id to the request object
        req.userId = decodedUser.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
}

module.exports = isAuthenticated;
