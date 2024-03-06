//routes/account.js - backend
const express = require("express");
const { authmiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");
const { Account } = require("../db");
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


router.post("/transfer", authmiddleware, async(req, res) => {
    //session wraps the code inside and it either does the transaction completely or doesn't do it. It doesn't do partial transaction
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
    )

    await session.commitTransaction(); //The wrapping ends here

    res.json({
        msg: "Transfer Successful"
    })

})


module.exports = router;