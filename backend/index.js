require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

// Import config info
const { port } = require('./src/config/serverConfig');
const { setup } = require('./src/config/dbConfig');

// Import routes
const routes = require('./src/routes');

// Import individual middleware files
const errorHandler = require('./src/middleware/errorHandler');
const logger = require('./src/middleware/logger');

// Parse JSON bodies
app.use(express.json());

// Configure Middleware
app.use(cors());
app.use(logger);

// Default route
app.get('/', (req, res) => {
    res.sendStatus(200);
});

// This will prefix '/api' to all routes
app.use('/api', routes);

// Error Handler Middleware (after routes)
app.use(errorHandler);

app.listen(port, async () => {
    await setup();
    console.log(`Server running on port ${port}`);
});