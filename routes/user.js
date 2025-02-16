
import express from "express";
import User from "../modals/user.js"; // ✅ User model ko import karna zaroori hai
import bcrypt from "bcryptjs"; //



const router = express.Router();

// Sign-up Route
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body; // ✅ address ka spelling check karein

        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be more than 4 characters" });
        }

        // Check if username already exists
        const userExist = await User.findOne({ username:username });

        if (userExist) {
            return res.status(400).json({ message: "Username already exists" });
        }
         // Check if email already exists?
         const Existemail = await User.findOne({ email:email });

         if (Existemail) {
             return res.status(400).json({ message: "email already exists" });
         }

         //if check password lenght
         if (password.length < 5) 
         {
            return res.status(400).json({ message: "Password must be more than 5 characters"})
         }
        
         const hashedPassword = await bcrypt.hash("yourpassword", 10);

        // Create a new user
        const newUser = new User({ username:username,
            email:email,
            password:hashedPassword,
             address:address });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in /register:", error); // ✅ Yeh error console mein print karega
        res.status(500).json({ message: "Internal server error" });
    }
});

//sign in
// router.post("/sign-in", async (req, res) => {
//     try {

//         const { username, password } = req.body;
//         const user = await User.findOne({ username });
//         if (!user) 
//         {
//             return res.status(400).json({ message: "Invalid username or password" });
//         }
//     const ismatch = await bcrypt.compare(password, user.password,(err,data)=>{
       
//         if (ismatch) {

//             return res.status(200).json({ message: "sign sucessfully" });
    

//         }else{
//             return res.status(400).json({ message: "Invalid username or password" });
//         }

//      });


//     }

//      catch (error) {
//         console.error("Error in /register:", error); // ✅ Yeh error console mein print karega
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

export default router;