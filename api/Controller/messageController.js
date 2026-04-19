const { default: mongoose } = require("mongoose");
const Message = require("../models/message.model");
const Conversation = require("../models/conversation");
const { verifyToken } = require("../utils/verifyToken");

// const sendMessage = async (req, res) => {
//   const { senderId, reciverId, content } = req.body;
//   let token = req.cookies;
//   console.log(token["mizan-cookie"])
// verifyToken(token["mizan-cookie"])

//   try {
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, reciverId] },
//     });
//     // console.log(conversation);

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, reciverId],
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(senderId)) {
//       throw new Error("Sender Id is not Valid");
//     } else if (!mongoose.Types.ObjectId.isValid(reciverId)) {
//       throw new Error("receiver Id is not Valid");
//     } else if (!content) {
//       throw new Error("Write content");
//     }
//     const message = new Message({
//       content: content,
//       senderId: senderId,
//       reciverId: reciverId,
//     });
//     conversation.messages.push(message._id);
//     // await message.save()
//     // await conversation.save()
//     await Promise.all([message.save(), conversation.save()]);

//     // console.log(message._id);
//     return res.status(201).send("Message Sent");
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    const token = req.cookies["mizan-cookie"];
    const user = verifyToken(token);

    const senderId = user._id;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid receiver ID" });
    }

    if (!content) {
      return res.status(400).json({ message: "Message is empty" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const message = await Message.create({
      content,
      senderId,
      receiverId,
    });

    conversation.messages.push(message._id);
    await conversation.save();

    // ✅ send real message back
    res.status(201).json(message);

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};
// const viewMessage = async (req, res) => {
//   const { senderId, reciverId } = req.body;
//   try {
//     // const messages = await Message.find({ $or: [{ senderId }, { reciverId }] });
//     // return res.status(200).send(messages);
//     const conversation = await Conversation.find({
//       participants: { $all: [senderId, reciverId] },
//     }).populate({ path: "messages" });
//     const messageOnly = conversation.map((message) => message.messages);

//     return res.status(200).send(messageOnly);
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// };
// const updateMessage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const message = await Message.findByIdAndUpdate(id, req.body);
//     if (!message) {
//       return res.status(404).json({ message: "Message not found" });
//     }
//     const updatedMessage = await Message.findById(id);
//     res.status(200).json(updatedMessage);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Message.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const deleteMessage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { senderId } = req.body;
//     const message = await Message.findById(id);
//     if (!message) {
//       return res.status(400).json({ message: "Message Does not Exist" });
//     }
//     if (message.senderId.toString() !== senderId) {
//       return res
//         .status(403)
//         .json({ message: "You can only delete your own message" });
//     }
//     await Message.findByIdAndDelete(id);
//     res.status(200).json({ message: "Message deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const token = req.cookies["mizan-cookie"];
    const user = verifyToken(token);

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.senderId.toString() !== user.id) {
      return res.status(403).json({
        message: "You can only delete your own message",
      });
    }

    await Message.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const getConversation = async (req, res) => {
//   const { senderId, reciverId } = req.body;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(senderId))
//       return res.status(400).send("Sender Id is not valid");
//     if (!mongoose.Types.ObjectId.isValid(reciverId))
//       return res.status(400).send("Receiver Id is not valid");

//     // Fetch messages where sender/receiver is either of them
//     const messages = await Message.find({
//       $or: [
//         { senderId, reciverId },
//         { senderId: reciverId, reciverId: senderId },
//       ],
//     }).sort({ createdAt: 1 }); // chronological order

//     return res.status(200).json(messages);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };
const getConversation = async (req, res) => {
  try {
    const { receiverId } = req.params;

    const token = req.cookies["mizan-cookie"];
    const user = verifyToken(token);

    const senderId = user._id;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid receiver ID" });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      options: { sort: { createdAt: 1 } },
    });

    if (!conversation) {
      return res.status(200).json([]); // no messages yet
    }

    res.status(200).json(conversation.messages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getConversation,
  updateMessage,
  deleteMessage,
};
