const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// JWT Secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

// Server configuration
const SERVER_CONFIG = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development"
};

module.exports = {
    JWT_SECRET,
    SERVER_CONFIG
};
