const express = require('express');
const router = express.Router();

// Import individual router files
const authRouter = require('./authRouter');
const taskRouter = require('./taskRouter');
const categoryRouter = require('./categoryRouter');

// Import middleware for isAuthenticated
const isAuthenticated = require('../middleware/isAuthenticated');

// Set up route middlewares
// This will prefix '/auth' to all routes defined in authRouter
router.use('/auth', authRouter);

// This will prefix '/tasks' to all routes defined in taskRouter
// Require authentication to use these routes
router.use('/tasks', isAuthenticated, taskRouter);

// This will prefix '/categories' to all routes defined in categoryRouter
// Require authentication to use these routes
router.use('/categories', isAuthenticated, categoryRouter);

// Export the router to be mounted in the main app
module.exports = router;
