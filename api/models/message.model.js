const mongoose=require("mongoose");
const MessageSchema = new mongoose.Schema({
    content:{
        type:String,
    },
    senderId:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId

    },
    receiverId:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId

    },
    viewStatus:{
        type:Boolean,
        default:false
    },
    
},{
    timestamps:true
})
const Message=mongoose.model("message",MessageSchema)
module.exports=Message