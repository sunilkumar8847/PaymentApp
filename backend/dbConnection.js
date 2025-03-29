// Database connection handler
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas URI
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB with Atlas configuration
const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB Atlas...");
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        
        console.log(`MongoDB Atlas connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        console.error("\n===== DATABASE CONNECTION TROUBLESHOOTING =====");
        console.error("1. Check your internet connection");
        console.error("2. Verify the MongoDB Atlas URI is correct");
        console.error("3. Make sure your IP address is whitelisted in MongoDB Atlas");
        console.error("4. Confirm the username and password are correct");
        console.error("=====================================\n");
        throw error;
    }
};

module.exports = { connectDB, MONGODB_URI }; 