const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    messages: [
      {
        ref: "message",
        type: mongoose.Schema.Types.ObjectId,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Conversation = mongoose.model("conversation", ConversationSchema);
module.exports = Conversation;
