const express = require("express")
const router =express.Router();
const authMiddleware=require("../MiddleWare/authMiddleWare")
const {createGroup,joinGroup, deleteGroup, promoteMember,sendGroupMessage,getGroupMessages,addmember,roleChange }=require("../Controller/groupController")
// const {sendGroupMessage}=require("../Controller/postController")
router.post("/createGroup",authMiddleware,createGroup)
router.post("/joinGroup",authMiddleware,joinGroup)
router.post("/deleteGroup",authMiddleware,deleteGroup)
router.post("/promoteGroup",authMiddleware,promoteMember)
router.post("/sendGroupMessage",authMiddleware,sendGroupMessage)
router.post("/getGroupMessages",authMiddleware,getGroupMessages)
router.post("/addmember",authMiddleware,addmember)
router.post("/roleChange",authMiddleware,roleChange)



module.exports=router;