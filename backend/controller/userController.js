const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postSignUp = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password is required" });
    }
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: "Email is already exist" })
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
        email,
        password: hashPassword,
        role: role || "user",
    })

    let token = jwt.sign({
        email,
        id: newUser._id,
        role: newUser.role,
    },
        process.env.JWT_SECRET
    )
    return res.status(200).json({ token, user: newUser });
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and Password is required" })
    }

    let user = await User.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
        let token = jwt.sign(
            { email, id: user._id, role: user.role },
            process.env.JWT_SECRET
        );
        return res.status(200).json({ token, user })
    }
    else {
        res.status(400).json({ error: "Invalid credientials" })
    }
}

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json({ email: user.email })
}