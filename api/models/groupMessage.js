const mongoose = require("mongoose");

const GroupMessageSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachment: [{ type: String }],
    totalView: {
      type: Number,
    },
  },
  { timestamps: true },
);

const GroupMessage = mongoose.model("groupmessage", GroupMessageSchema);
module.exports = GroupMessage;
