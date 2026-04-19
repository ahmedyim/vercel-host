const mongoose = require("mongoose");
const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    ProfilePic: {
      type: String,
    },
    description: {
      type: String,
    },
    grouptype: {
      type: String,
      enum: ["Private", "Public"],
      default: "Public",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
       required: true
    },
  },
  {
    timestamps: true,
  },
);
const Group = mongoose.model("group", GroupSchema);
module.exports = Group;
