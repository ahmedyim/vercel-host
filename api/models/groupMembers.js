const mongoose=require("mongoose")
const GroupMembersSchema=new mongoose.Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    role:{
        type:String,
        enum:["Owner","Admin","Member"],
        default:"Member",
        
    },
   
},
{
    timestamps:true
})
// GroupMembersSchema.index({ groupId: 1, user: 1 }, { unique: true });
const GroupMember = mongoose.model("groupmember", GroupMembersSchema);
module.exports = GroupMember;