const userSchema = require("../models/User");
const User = require("../models/User"); // Import the User model
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const secretKey = "rasool786";
const Admin = require("../models/AdminModel");
// const AdminSchema = require("../models/AdminModel");
const AdminModel = require("../models/AdminModel");


// Admin OR User Registration logic-------------
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Valid roles are 'user' and 'admin'." });
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
        if (existingUser && existingAdmin) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email already registered as a user" });
            }
            if (existingAdmin.email === email) {
                return res.status(400).json({ message: "Email already registered as an admin" });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username already taken by a user" });
            }
            if (existingAdmin.username === username) {
                return res.status(400).json({ message: "Username already taken by an admin" });
            }
        } else if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email already registered as a user" });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username already taken by a user" });
            }
        } else if (existingAdmin) {
            if (existingAdmin.email === email) {
                return res.status(400).json({ message: "Email already registered as an admin" });
            }
            if (existingAdmin.username === username) {
                return res.status(400).json({ message: "Username already taken by an admin" });
            }
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        let newUser;

        if (role === "admin") {
            // Create a new admin instance with the hashed password
            newUser = new AdminModel({ username, email, password: hashedPassword, role });
        } else if (role === "user") {
            // Create a new user instance with the hashed password
            newUser = new User({ username, email, password: hashedPassword, role });
        } else {
            return res.status(400).json({ message: "Invalid role. Valid roles are 'admin' and 'user'." });
        }

        // Save the new user to the Database
        await newUser.save();

        res.status(201).json({ message: "User registered" });
    } catch (error) {
        console.error(error);

        // Handle specific error cases
        if (error.name === "ValidationError") {
            // Handle Mongoose validation errors
            const errorMessage = Object.values(error.errors).map(err => err.message).join(", ");
            res.status(400).json({ message: errorMessage });
        } else {
            // Handle other errors
            res.status(500).json({ message: "An error occurred" });
        }
    }
};




//Admin Or User Login Logic--------------
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the User collection
        let user = await User.findOne({ email });

        // If the user is not found in the User collection, check in the Admin collection
        if (!user) {
            user = await AdminModel.findOne({ email });
        }

        if (!user) {
            return res.status(401).json({ message: "Email not found. Please check your email and try again." });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password. Please make sure you're using the correct password." });
        }

        // Determine the role of the user based on the collection where they were found
        const role = user instanceof User ? "user" : "admin";

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email,
                role: role.role // Include the role in the token payload
            },
            secretKey,
            { expiresIn: "1h" } // Customize the expiration as needed
        );

        res.status(200).json({ message: `${role} login successful`, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
};




//export modules--------
module.exports = {
    register,login
};
