const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kumar88:Sks77899@cluster0.suqwfyj.mongodb.net/Paytm');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLenght: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User = mongoose.model('User', UserSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        // Why don't we store float like 8858.78 rs ? Because in JS and other languages there is a preceision error which can make 8858.78 to 8858.77999999
        // So We store it in Number(int) 885878 and take 2 decimal places, for 555 we store 55500 and take 2 decimal places so that we can show it 555.00
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
};