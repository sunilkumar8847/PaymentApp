// MongoDB Connection Test Tool
const mongoose = require('mongoose');
const { DB_CONFIG } = require('./config');

// Test all possible connection methods
async function testConnections() {
    console.log("===== MongoDB Connection Tester =====");
    
    // Test Atlas Connection
    await testAtlasConnection();
    
    // Test Direct Connection
    await testDirectConnection();
    
    // Test Local Connection
    await testLocalConnection();
    
    console.log("\n===== TEST SUMMARY =====");
    if (successfulConnection) {
        console.log("✅ At least one connection method worked!");
        console.log(`Success: ${successfulConnection.name}`);
        console.log(`Connection string is loaded from .env file`);
    } else {
        console.log("❌ All connection methods failed!");
        console.log("Please check your MongoDB setup and network connectivity.");
        console.log("Verify the connection strings in your .env file.");
    }
    
    process.exit(0);
}

// Connection options
const options = DB_CONFIG.options;

// Track which connection succeeds
let successfulConnection = null;

// Test Atlas Connection
async function testAtlasConnection() {
    console.log("\n1️⃣ Testing MongoDB Atlas Connection (SRV format):");
    const connectionString = DB_CONFIG.MONGODB_URI;
    
    try {
        const conn = await mongoose.connect(connectionString, options);
        console.log("✅ SUCCESS: Connected to MongoDB Atlas");
        console.log(`Host: ${conn.connection.host}`);
        await mongoose.disconnect();
        successfulConnection = {
            name: "MongoDB Atlas (SRV)",
            uri: "MONGODB_URI from .env" // Don't show actual connection string for security
        };
        return true;
    } catch (error) {
        console.error(`❌ FAILED: ${error.message}`);
        return false;
    }
}

// Test Direct Connection
async function testDirectConnection() {
    console.log("\n2️⃣ Testing Direct Connection (non-SRV format):");
    const connectionString = DB_CONFIG.MONGODB_DIRECT_URI;
    
    try {
        const conn = await mongoose.connect(connectionString, options);
        console.log("✅ SUCCESS: Connected via direct connection");
        console.log(`Host: ${conn.connection.host}`);
        await mongoose.disconnect();
        if (!successfulConnection) {
            successfulConnection = {
                name: "MongoDB Direct Connection",
                uri: "MONGODB_DIRECT_URI from .env"
            };
        }
        return true;
    } catch (error) {
        console.error(`❌ FAILED: ${error.message}`);
        return false;
    }
}

// Test Local Connection
async function testLocalConnection() {
    console.log("\n3️⃣ Testing Local MongoDB Connection:");
    const connectionString = DB_CONFIG.MONGODB_LOCAL_URI;
    
    try {
        const conn = await mongoose.connect(connectionString, options);
        console.log("✅ SUCCESS: Connected to local MongoDB");
        console.log(`Host: ${conn.connection.host}`);
        await mongoose.disconnect();
        if (!successfulConnection) {
            successfulConnection = {
                name: "Local MongoDB",
                uri: "MONGODB_LOCAL_URI from .env"
            };
        }
        return true;
    } catch (error) {
        console.error(`❌ FAILED: ${error.message}`);
        return false;
    }
}

// Run the tests
testConnections().catch(console.error); 