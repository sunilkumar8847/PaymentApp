const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const { authmiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            msg: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.json({
            msg: "Email is already registered"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        msg: "User Created sucessfully",
        token: token
    });
});

// Sign In
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {

    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.json({
            msg: "Invalid input"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.json({
            token: token
        })
        return;
    }

    return res.status(411).json({
        msg: "Error while logging in"
    })

})

const updatebody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/", authmiddleware, async (req, res) => {
    const { success } = updatebody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            msg: "Error while updating information"
        })
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        msg: "Updated Sucessfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filtered = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filtered,
                "$options": "i"
            }
        },
        {
            lastName: {
                "$regex": filtered,
                "$options": "i"
            }

        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get("/me", authmiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({
            msg: "Server error while fetching user data"
        });
    }
});

module.exports = router;