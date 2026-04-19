const express = require("express")
const router =express.Router();
const {  getUserByid,createUser,getUsers } = require("../Controller/userController");
const {login}=require("../Controller/authController")
const {transfer}=require("../Controller/bankTransfer")


router.get("/user/:id", getUserByid);
router.post("/createuser",createUser );
router.get("/allusers",getUsers);
router.post("/login",login);
router.post("/transfer",transfer);


module.exports=router;