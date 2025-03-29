// Script to seed sample transactions in the database
const mongoose = require('mongoose');
const { User, Transaction, Account } = require('../db');
const { DB_CONFIG } = require('../config');

// Connect to the database
async function connectToDatabase() {
    try {
        await mongoose.connect(DB_CONFIG.MONGODB_URI, DB_CONFIG.options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
}

// Generate random transactions between users
async function seedTransactions() {
    try {
        // Get all users
        const users = await User.find({});
        
        if (users.length < 2) {
            console.error('Need at least 2 users to create transactions');
            return;
        }
        
        console.log(`Found ${users.length} users`);
        
        // Check if there are any existing transactions
        const existingTransactions = await Transaction.countDocuments();
        console.log(`Found ${existingTransactions} existing transactions`);
        
        if (existingTransactions > 0) {
            const shouldProceed = process.argv.includes('--force');
            if (!shouldProceed) {
                console.log('Transactions already exist. Use --force to override.');
                process.exit(0);
            }
        }
        
        // Create random transactions
        const transactions = [];
        const numberOfTransactions = 20; // Change this number to generate more or fewer transactions
        const NOW = new Date();
        const ONE_MONTH_AGO = new Date(NOW);
        ONE_MONTH_AGO.setMonth(ONE_MONTH_AGO.getMonth() - 1);
        
        for (let i = 0; i < numberOfTransactions; i++) {
            // Pick random sender and receiver
            const senderIndex = Math.floor(Math.random() * users.length);
            let receiverIndex;
            do {
                receiverIndex = Math.floor(Math.random() * users.length);
            } while (receiverIndex === senderIndex); // Ensure sender != receiver
            
            const sender = users[senderIndex];
            const receiver = users[receiverIndex];
            
            // Random amount between 10 and 1000
            const amount = Math.floor(Math.random() * 990) + 10;
            
            // Random date within the last month
            const timestamp = new Date(ONE_MONTH_AGO.getTime() + Math.random() * (NOW.getTime() - ONE_MONTH_AGO.getTime()));
            
            transactions.push({
                fromUserId: sender._id,
                toUserId: receiver._id,
                amount,
                timestamp
            });
        }
        
        // Save transactions to database
        await Transaction.insertMany(transactions);
        
        console.log(`Successfully created ${transactions.length} sample transactions`);
    } catch (error) {
        console.error('Error seeding transactions:', error);
    }
}

// Run the script
async function run() {
    await connectToDatabase();
    await seedTransactions();
    mongoose.connection.close();
    console.log('Done!');
}

run(); 