// Use this script if you want to run MongoDB locally instead of using Atlas
const mongoose = require('mongoose');

// Connect to a local MongoDB instance
const connectLocalDB = async () => {
    try {
        // For local MongoDB - You need to install MongoDB on your computer
        const conn = await mongoose.connect('mongodb://localhost:27017/PaymentApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`Local MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`Error connecting to local MongoDB: ${error.message}`);
        console.error('Make sure MongoDB is installed and running on your computer.');
        console.error('You can install MongoDB from: https://www.mongodb.com/try/download/community');
        console.error('After installation, start the MongoDB service before running your app.');
        return false;
    }
};

// Import models from original db.js
const { UserSchema, accountSchema } = require('./models');

// Define models
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);

module.exports = {
    connectLocalDB,
    User,
    Account
}; 