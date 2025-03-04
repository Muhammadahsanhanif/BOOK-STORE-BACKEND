import express from "express";
import User from "../modals/user.js"; // ✅ Import the User model

import authenticateToken from "./userAuth.js"; // ✅ Import fixed authentication middleware

const router = express.Router();

//add book to favourite

router.put("/add-book-to-favourite ",authenticateToken,async(req,res)=>{
    try {
        const {bookid,id} = req.header;
        const userdata = await User.findById(id);
        const isbookfavourite =userdata.favorite.includes(bookid)
        if(isbookfavourite){
            return res.status(200).json({massage:"book is already in favorite"})
        }
        await User.findByIdAndUpdate(id,{$push:{favorite:bookid}});
        return res.status(200).json({massage:"book added to favourite"})

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });

    }
})


export default router;
