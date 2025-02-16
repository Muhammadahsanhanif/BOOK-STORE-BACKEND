import mongoose from "mongoose";

const order =new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"books"
    },
    status:{
        type:String,
        default:"order placed",
        enum:["order placed","out for delivery","Delivered","canceled"]
    }
},{timestamps:true})
module.exports = mongoose.model("order",order)