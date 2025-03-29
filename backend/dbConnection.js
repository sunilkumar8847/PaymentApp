// Database connection handler
const mongoose = require('mongoose');
const { DB_CONFIG } = require('./config');

// Connect to MongoDB with fallback options
const connectDB = async () => {
    // Connection options
    const options = DB_CONFIG.options;

    try {
        // Option 1: Try MongoDB Atlas connection
        console.log("Connecting to MongoDB Atlas...");
        const conn = await mongoose.connect(
            DB_CONFIG.MONGODB_URI, 
            options
        );
        
        console.log(`MongoDB Atlas connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`MongoDB Atlas connection failed: ${error.message}`);
        
        // Check if it's a DNS resolution error
        if (error.message.includes('ENOTFOUND')) {
            console.log("DNS resolution failed. Trying alternative connection...");
            
            try {
                // Option 2: Try direct connection strings
                console.log("Trying direct connection to Atlas...");
                const conn = await mongoose.connect(
                    DB_CONFIG.MONGODB_DIRECT_URI,
                    options
                );
                console.log(`Direct connection successful: ${conn.connection.host}`);
                return conn;
            } catch (directError) {
                console.error(`Direct connection failed: ${directError.message}`);
                
                // Option 3: Try local MongoDB
                try {
                    console.log("Trying local MongoDB connection...");
                    const conn = await mongoose.connect(DB_CONFIG.MONGODB_LOCAL_URI, options);
                    console.log(`Local MongoDB connected: ${conn.connection.host}`);
                    console.log("⚠️ WARNING: Using local database - data will not sync with production");
                    return conn;
                } catch (localError) {
                    // All connection attempts failed
                    console.error(`Local MongoDB connection failed: ${localError.message}`);
                    logDatabaseHelp();
                    throw new Error("All database connection attempts failed");
                }
            }
        } else if (error.message.includes('authentication failed')) {
            console.error("Authentication failed - username or password is incorrect");
            logDatabaseHelp();
            throw error;
        } else {
            // Unknown error
            logDatabaseHelp();
            throw error;
        }
    }
};

// Helper function to log database troubleshooting tips
function logDatabaseHelp() {
    console.error("\n===== DATABASE CONNECTION TROUBLESHOOTING =====");
    console.error("1. Check MongoDB Atlas connection:");
    console.error(`   - Verify cluster name is correct in your .env file`);
    console.error("   - Confirm username and password are correct in your .env file");
    console.error("   - Add your current IP address to the MongoDB Atlas IP whitelist");
    console.error("   - Check your network/VPN settings or firewall restrictions");
    console.error("\n2. Try local MongoDB:");
    console.error("   - Install MongoDB Community: https://www.mongodb.com/try/download/community");
    console.error("   - Start the MongoDB service on your computer");
    console.error("   - Run your app again");
    console.error("=====================================\n");
}

module.exports = { connectDB }; 