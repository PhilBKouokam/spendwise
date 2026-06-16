import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user = new User({ username, email, password: hashedPassword });
    
        const savedUser = await user.save();
    
        const token = jwt.sign(
            {
                userId: savedUser._id,
                username: savedUser.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
    
        res.status(201).json({
            message: "User successfully registered",
            token: token,
            user : { id: savedUser._id, username: savedUser.username, email: savedUser.email }
        });
    } catch (err) {
        console.error(`Server error while creating account: ${err.message}`);
        res.status(500).json({
            message: "Network error! Please try again",
            error: err.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: "Login successful",
            token: token,
            user: {id: user._id, username: user.username, email: user.email}
        });
    } catch (err) {
        console.error(`Login Error: ${err.message}`);
        res.status(500).json({
            message: "Network error! Please try again",
            error: err.message
        });
    }
};