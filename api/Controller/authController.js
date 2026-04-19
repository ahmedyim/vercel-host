const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const {generateToken}=require("../utils/generateToken")
const { hash } = require("bcrypt");

const login = async (req, res,next) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone: phone });
  console.log("Login function called",req.body);
  console.log(user);
    if (!user) {
      const error=new Error("Invalid Credentials/phone" )
      error.statusCode=401;
      return next(error)
    }
    let isMatch =  bcrypt.compare(
      password,
      user.password
    );
    if (!isMatch) {
       const error=new Error("Invalid Credentials/password" )
      error.statusCode=403;
      return next(error)
    }
    // return res.status(200).json({ message: "Login Success" });
   let gttoken =generateToken(user._id)
   res.cookie("mizan-cookie",gttoken,{
      maxAge:24*60*60*1000,
      httpOnly:true,
      path:"/"
   })
   return res.status(200).send({token:gttoken,userId:user._id})
  } catch (error) {
    next(error)
  }
};

module.exports = {
  login,
};
