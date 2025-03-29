//routes/account.js - backend
const express = require("express");
const { authmiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");
const { Account, Transaction, User } = require("../db");
const router = express.Router();

router.get('/balance', authmiddleware, async(req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    if (!account) {
        return res.status(404).json({ msg: "Account not found" });
    }

    res.json({
        balance: account.balance
    })
})

// Get transaction history
router.get('/transactions', authmiddleware, async(req, res) => {
    try {
        // Find all transactions where the user is either sender or recipient
        const transactions = await Transaction.find({
            $or: [
                { fromUserId: req.userId },
                { toUserId: req.userId }
            ]
        }).sort({ timestamp: -1 }) // Sort by newest first
          .limit(50); // Limit to most recent 50 transactions
        
        // Get all unique user IDs from these transactions
        const userIds = [...new Set([
            ...transactions.map(t => t.fromUserId.toString()),
            ...transactions.map(t => t.toUserId.toString())
        ])];
        
        // Fetch user information for these IDs
        const users = await User.find({
            _id: { $in: userIds }
        }, { _id: 1, firstName: 1, lastName: 1 });
        
        // Create a map for quick lookup
        const userMap = {};
        users.forEach(user => {
            userMap[user._id.toString()] = {
                firstName: user.firstName,
                lastName: user.lastName
            };
        });
        
        // Format transactions with user info
        const formattedTransactions = transactions.map(transaction => {
            const isOutgoing = transaction.fromUserId.toString() === req.userId.toString();
            const otherUserId = isOutgoing ? transaction.toUserId.toString() : transaction.fromUserId.toString();
            const otherUser = userMap[otherUserId] || { firstName: 'Unknown', lastName: 'User' };
            
            return {
                id: transaction._id,
                amount: transaction.amount,
                timestamp: transaction.timestamp,
                isOutgoing,
                otherUser: {
                    id: otherUserId,
                    firstName: otherUser.firstName,
                    lastName: otherUser.lastName
                }
            };
        });
        
        res.json({
            transactions: formattedTransactions
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({
            msg: "Error fetching transaction history"
        });
    }
});

router.post("/transfer", authmiddleware, async(req, res) => {
    // This transaction ensures money transfer is atomic - either completes fully or not at all
    const session = await mongoose.startSession();
    session.startTransaction();

    const { to, amount } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(401).json({
            msg: "Invalid Account"
        })
    }
    if(amount < 1){
        return res.status(401).json({
            msg: "Invalid amount"
        })
    }

    await Account.updateOne(
        {
            userId: req.userId
        },
        {
            $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne(
        {
            userId: to 
        },
        {
            $inc: {
                balance: amount
            }
        }
    ).session(session);

    // Record the transaction
    await Transaction.create([{
        fromUserId: req.userId,
        toUserId: to,
        amount: amount,
        timestamp: new Date()
    }], { session });

    await session.commitTransaction();

    res.json({
        msg: "Transfer Successful"
    })
})

module.exports = router;