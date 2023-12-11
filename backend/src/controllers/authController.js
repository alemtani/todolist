const authService = require('../services/authService');

/* Register user. */
async function registerUser(req, res, next) {
    try {
        const result = await authService.registerUser(req.body);
        res.json(result);
    } catch (err) {
        console.error(`Error while registering user:`, err.message);
        next(err);
    }
}

/* Login user. */
async function loginUser(req, res, next) {
    try {
        const result = await authService.loginUser(req.body);
        res.json(result);
    } catch (err) {
        console.error(`Error while logging in user:`, err.message);
        next(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
};
