import express from "express";
import User from "../modals/user.js"; 
import Book from "../modals/book.js";
import authenticateToken from "./userAuth.js";

const router = express.Router(); // ✅ Router initialized

// ✅ Add Book Route
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const id = req.user.id; // ✅ Extract ID from authenticated user
        console.log("📌 Extracted User ID:", id);

        if (!id) {
            return res.status(400).json({ message: "User ID not found in token" });
        }

        const user = await User.findById(id);
        console.log("👤 Fetched User:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to add books" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            desc: req.body.desc,
            price: req.body.price,
            language: req.body.language
        });

        await book.save();
        res.status(201).json({ message: "Book added successfully" });

    } catch (error) {
        console.error("🚨 Error adding book:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
// update-book
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers; // ✅ Extract book ID from headers

        const updatedBook = await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            desc: req.body.desc,
            price: req.body.price,
            language: req.body.language
        }, { new: true }); // ✅ Return updated book

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});
// delete-book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers; // 
        
        const deletedBook = await Book.findByIdAndDelete(bookid);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook
        });

    } catch (error) {
        console.error("🚨 Error deleting book:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//get all book 

router.get("/get-all-book",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1});
        return res.status(200).json({
            status: "Books retrieved successfully",
            data: books
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });

    }
})
//get recently at book limit 4

router.get("/get-recently-at-book",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1}).limit(1);
        return res.status(200).json({
            status: " successfully",
            data: books
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });

    }

})

//get book by id

router.get("/get-book-by-id/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        
        return res.status(200).json({
            status: " successfully",
            data: book
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
        
    }
})

export default router;
