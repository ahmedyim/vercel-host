const Group = require("../models/group.model");
const GroupMember = require("../models/groupMembers");
const User = require("../models/user.model");
const GroupMessage = require("../models/groupMessage");

const createGroup = async (req, res, next) => {
  try {
    const { name, link, ProfilePic, description, grouptype } = req.body;
    let ownerId = req.id;
    if (!name || !link) {
      const error = new Error("Name and link are required");
      error.statusCode = 400;
      return next(error);
    }
    const existingGroup = await Group.findOne({ link: link });
    if (existingGroup) {
      const error = new Error("Group link already exists");
      error.statusCode = 400;
      return next(error);
    }

    const newGroup = await Group.create({
      name,
      link,
      ProfilePic,
      description,
      grouptype,
      createdBy: ownerId,
    });
    await GroupMember.create({
      groupId: group.id,
      userId: req.user.id,
      role: "Owner",
    });
    const error = new Error("Group created successfully");
    error.statusCode = 201;
    return next(error);
  } catch (error) {
    next(error);
  }
};
const addmember = async (req, res, next) => {
  const { link } = req.body;
  const userId = req.id;
  const group = await Group.findOne({link});
  if (!group) {
    return res.status(404).json({
      success: false,
      message: "Group not found",
    });
  }
  if (group.grouptype === "Private") {
  return res.status(403).json({
    success: false,
    message: "You cannot join a private group without an invite",
  });
}
  const user = await GroupMember.findOne({
    userId: userId,
    groupId: group._id,
  });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "You are already a member of this group",
    });
  }
  await GroupMember.create({
    groupId: group._id,
    userId: userId,
  });
  return res.status(201).json({ message: "joined Successfully" });
}
const roleChange=async (req, res, next) =>{
  const {userId,role,groupId}=req.body
  const isOwner=await Group.findOne({
    groupId:groupId,
    createdBy:req.id
  })
  if (isOwner) {
  return res.status(403).json({
    success: false,
    message: "You can not change role",
  });
}
  const userGroup=await GroupMember.findOne({groupId:groupId,userId:userId})
  if(!userGroup){
     return res.status(403).json({
    success: false,
    message: "User not found",
  });
  }
  userGroup.role=role
  await userGroup.save()
  return res.status(200).json({message:"role changed"})

}
const promoteMember = async (req, res, next) => {
  try {
    const { groupId, userId } = req.body;

    const requester = await GroupMember.findOne({
      groupId,
      userId: req.id,
    });
    if (requester || !["Owner", "Admin"].includes(requester.role)) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      next(error);
    }
    const member = await GroupMember.findOne({ groupId, userId });
    if (!member) {
      const error = new Error("Member not found");
      error.statusCode = 404;
      next(error);
    }
    if (member.role === "Owner") {
      const error = new Error("Owner cannot be changed");
      error.statusCode = 400;
      next(error);
    }
    member.role = "Admin";
    await member.save();
    const error = new Error("Promoted to Admin");
    error.statusCode = 200;
    next(error);
  } catch (error) {
    next(error);
  }
};
const joinGroup = async (req, res, next) => {
  try {
    const { groupId } = req.body;
    const userId = req.id;
    

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }
    const existingMember = await GroupMember.findOne({
      groupId,
      userId,
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "You are already a member of this group",
      });
    }
    const membership = await GroupMember.create({
      groupId,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "You joined the group successfully",
      membership,
    });
  } catch (error) {
    next(error);
  }
};
const deleteGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const member = await GroupMember.findOne({
      groupId,
      userId,
    });
    if (!member || member.role !== "Owner") {
      const error = new Error("Only Owner can delete this group");
      error.statusCode = 403;
      next(error);
    }
    await Group.findByIdAndDelete(groupId);
    await GroupMember.deleteMany({ groupId });
    const error = new Error("Group deleted");
    error.statusCode = 200;
    next(error);
  } catch (error) {
    next(error);
  }
};

const sendGroupMessage = async (req, res, next) => {
  try {
    const { groupId, content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Message content is required",
      });
    }

    // Check if user is a member of the group
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
  } catch (error) {
    next(error);
  }
};

const getGroupMessages = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    // Check membership
    const membership = await GroupMember.findOne({
      groupId,
      userId: req.user.id,
    });

    if (!membership) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const messages = await GroupMessage.find({ groupId })
      .populate("senderId", "username email")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createGroup,
  joinGroup,
  deleteGroup,
  promoteMember,
  sendGroupMessage,
  getGroupMessages,
  addmember,
  roleChange
};
