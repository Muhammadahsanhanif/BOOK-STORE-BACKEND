import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    address: { // ✅ Correct spelling
        type: String, 
        required: true 
    }
    ,
    avatar: { 
        type: String, 
        default: "https://cdn-icon-png.flaticon.com/128/3177/3177440.png" 
    },
    role: { 
        type: String, 
        default: "user",
        enum: ["user", "admin"]
    },
    favorite: [{
        type: mongoose.Schema.Types.ObjectId, // ❌ `mongoose.type.objectid` wrong hai
        ref: "books",
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
    }],
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
    }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User; // ✅ ES Modules ke liye export
