const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{
        type:String
    },
    userName:{
        type:String,
        unique:true
    },
    phone:{
        type:String,
        unique:true
    },
    profilePic:String,
    password:String,
    bio:String,
    balance:Number
})
const User=mongoose.model("User",UserSchema)
module.exports=User