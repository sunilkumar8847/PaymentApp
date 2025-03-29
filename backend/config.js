const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// JWT Secret - using environment variable or fallback to default
const JWT_SECRET = process.env.JWT_SECRET || "Sonu";

// MongoDB configuration
const DB_CONFIG = {
    // Primary MongoDB Atlas URI (SRV format)
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://kumar88:Sks77899@cluster0.suqwfyj.mongodb.net/Paytm?retryWrites=true&w=majority',
    
    // Fallback direct connection string
    MONGODB_DIRECT_URI: process.env.MONGODB_DIRECT_URI || 'mongodb://kumar88:Sks77899@ac-w0iyxmz-shard-00-00.suqwfyj.mongodb.net:27017,ac-w0iyxmz-shard-00-01.suqwfyj.mongodb.net:27017,ac-w0iyxmz-shard-00-02.suqwfyj.mongodb.net:27017/Paytm?ssl=true&authSource=admin&retryWrites=true&w=majority',
    
    // Local development MongoDB
    MONGODB_LOCAL_URI: process.env.MONGODB_LOCAL_URI || "mongodb://localhost:27017/PaymentApp",
    
    // Database credentials
    MONGODB_USERNAME: process.env.MONGODB_USERNAME || 'kumar88',
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || 'Sks77899',
    
    // Database name
    DB_NAME: process.env.DB_NAME || "Paytm",
    
    // Connection options
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000, // Wait 10 seconds before timing out
    }
};

// Server configuration
const SERVER_CONFIG = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development"
};

module.exports = {
    JWT_SECRET,
    DB_CONFIG,
    SERVER_CONFIG
};
