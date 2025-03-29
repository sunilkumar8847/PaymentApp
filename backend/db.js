const mongoose = require('mongoose');
const { UserSchema, accountSchema, transactionSchema } = require('./models');
require('dotenv').config();

// Get MongoDB URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PaymentApp';

// Simplified MongoDB connection
const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        console.error("\n===== MONGODB CONNECTION TROUBLESHOOTING =====");
        console.error("1. Make sure MongoDB is installed and running locally");
        console.error("2. Check that you can connect with MongoDB Compass using: mongodb://localhost:27017");
        console.error("3. Try starting MongoDB manually with: mongod");
        console.error("4. On Windows, check if the MongoDB service is running in Services app");
        console.error("=====================================\n");
        process.exit(1);
    }
};

// Create models from the schemas
const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', accountSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    User,
    Account,
    Transaction,
    connectDB
};