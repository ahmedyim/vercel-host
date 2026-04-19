const express = require("express");
const router = express.Router();
const authMiddleWare = require("../MiddleWare/authMiddleWare");
const {
  sendMessage,
  getConversation,
  updateMessage,
  deleteMessage,
} = require("../Controller/messageController");

router.post("/",authMiddleWare,sendMessage);
router.get("/:receiverId",authMiddleWare, getConversation);
router.put("/:id",authMiddleWare, updateMessage);
router.delete("/:id",authMiddleWare, deleteMessage);
router.get("/me", authMiddleWare, (req, res) => {
  res.json(req.user);
});
module.exports = router;
