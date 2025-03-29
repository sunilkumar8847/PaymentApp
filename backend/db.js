const mongoose = require('mongoose');
const { UserSchema, accountSchema, transactionSchema } = require('./models');

// MongoDB connection with multiple fallback options
const connectDB = async () => {
    try {
        // Option 1: Connect to MongoDB Atlas (primary)
        console.log("Attempting to connect to MongoDB Atlas...");
        const conn = await mongoose.connect('mongodb+srv://kumar88:Sks77899@cluster0.suqwfyj.mongodb.net/Paytm?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        
        console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
        return;
    } catch (error) {
        console.error(`Error connecting to MongoDB Atlas: ${error.message}`);
        
        // Try fallback options if Atlas fails
        if (error.message.includes('ENOTFOUND')) {
            console.error('DNS lookup failed. Your cluster name might be incorrect or network issues exist.');
            console.error('Trying alternative connection method...');
            
            try {
                // Option 2: Try connecting with direct connection string (might work if DNS is the issue)
                const conn = await mongoose.connect('mongodb://kumar88:Sks77899@ac-w0iyxmz-shard-00-00.suqwfyj.mongodb.net:27017,ac-w0iyxmz-shard-00-01.suqwfyj.mongodb.net:27017,ac-w0iyxmz-shard-00-02.suqwfyj.mongodb.net:27017/Paytm?ssl=true&replicaSet=atlas-mjn9l9-shard-0&authSource=admin&retryWrites=true&w=majority');
                console.log(`MongoDB Connected via direct connection: ${conn.connection.host}`);
                return;
            } catch (fallbackError) {
                console.error(`Direct connection failed: ${fallbackError.message}`);
                
                // Option 3: Try connecting to local MongoDB
                try {
                    console.log("Attempting to connect to local MongoDB...");
                    const conn = await mongoose.connect('mongodb://localhost:27017/PaymentApp', {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    });
                    console.log(`Local MongoDB Connected: ${conn.connection.host}`);
                    console.log("⚠️ Using local database - data won't sync with production");
                    return;
                } catch (localError) {
                    console.error(`Local MongoDB connection failed: ${localError.message}`);
                    console.error('\nPlease take one of these actions to fix the database connection:');
                    console.error('1. Check your MongoDB Atlas account at https://cloud.mongodb.com');
                    console.error('   - Verify the cluster name is correct');
                    console.error('   - Make sure your IP is whitelisted in Network Access settings');
                    console.error('   - Confirm username and password are correct');
                    console.error('2. Install MongoDB locally: https://www.mongodb.com/try/download/community');
                    process.exit(1);
                }
            }
        } else {
            console.error('Please check your MongoDB credentials and network connection.');
            process.exit(1);
        }
    }
};

// Connect to MongoDB
connectDB();

// Create models from the schemas
const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', accountSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    User,
    Account,
    Transaction
};