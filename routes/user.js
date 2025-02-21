import express from "express";
import User from "../modals/user.js"; // ✅ Import the User model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateToken from "./userAuth.js"; // ✅ Import fixed authentication middleware

const router = express.Router();

// ✅ Sign-Up Route
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be more than 4 characters" });
        }

        // Check if username already exists
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length < 5) {
            return res.status(400).json({ message: "Password must be more than 5 characters" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔑 Hashed Password:", hashedPassword);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("🚨 Error in /sign-up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Sign-In Route
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Include `id` in JWT token
        const authclaims = {
            id: user.id,  // ✅ Include user ID
            name: user.username,
            role: user.role
        };

        const token = jwt.sign({ authclaims }, "bookStore123", { expiresIn: "3d" });

        console.log("✅ Generated Token:", token);
        res.status(200).json({
            id: user.id,
            role: user.role,
            token: token
        });

    } catch (error) {
        console.error("🚨 Error in /sign-in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Get User Information (Protected Route)
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        console.log("🔍 User from Token:", req.user);

        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID not found in token" });
        }

        const user = await User.findById(userId).select("-password"); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("🚨 Error in /get-user-information:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
//UPDATE ADRESS ROUTE

router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { address } = req.body; // Ensure correct structure

        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { address } },
            { new: true } // Return updated document
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Address updated successfully", user });

    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
