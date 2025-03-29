const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');

// Try alternate DNS resolution method for SRV records
mongoose.connect('mongodb+srv://kumar88:Sks77899@cluster0.suqwfyj.mongodb.net/Paytm?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Longer timeout for testing
    directConnection: false
})
.then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log('Connection details:', mongoose.connection.host);
    process.exit(0);
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    
    // Provide more helpful diagnostics
    if (err.message.includes('ENOTFOUND')) {
        console.error('\nDNS resolution failed. This could be caused by:');
        console.error('1. Incorrect MongoDB Atlas cluster name');
        console.error('2. Network connectivity issues');
        console.error('3. VPN or firewall blocking MongoDB connections');
        console.error('\nAlternative connection string to try:');
        console.error('mongodb://kumar88:Sks77899@cluster0.suqwfyj.mongodb.net:27017/Paytm');
    }
    
    if (err.message.includes('authentication failed')) {
        console.error('\nAuthentication failed. Please check:');
        console.error('1. Username and password in connection string');
        console.error('2. Database user permissions in MongoDB Atlas');
    }
    
    process.exit(1);
}); 