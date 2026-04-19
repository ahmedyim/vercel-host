const GroupMessage=require("../models/groupMessage")
const GroupMember=require("../models/groupMember")
const sendGroupMessage=async(req,res,next)=>{
    try {
    const { groupId, content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Message content is required",
      });
    }
    const membership = await GroupMember.findOne({
          groupId,
          userId: req.id,
        });
    
        if (!membership) {
          return res.status(403).json({
            message: "You are not a member of this group",
          });
        }
    
        const message = await GroupMessage.create({
          groupId,
          senderId: req.id,
          content,
        });
    
        res.status(201).json({
          success: true,
          data: message,
        });


    }catch(error){
        next(error)
    }

}
module.exports={sendGroupMessage}