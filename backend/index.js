//index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import configuration
const { SERVER_CONFIG } = require('./config');

// Import database connection
const { connectDB } = require('./dbConnection');
const rootRouter = require('./routes/index');

const app = express();
const PORT = SERVER_CONFIG.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for checking server status
app.get('/', (req, res) => {
    res.json({ 
        message: 'PayPlus API is running', 
        status: 'OK',
        environment: SERVER_CONFIG.NODE_ENV,
        dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// API routes
app.use('/api/v1', rootRouter);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Handle server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start server function
const startServer = async () => {
    try {
        // First connect to database
        await connectDB();
        
        // Then start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} in ${SERVER_CONFIG.NODE_ENV} mode`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

// Start the server
startServer();

