const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const mongoose=require("mongoose")
const getUsers = async (req, res) => {
  const users = await User.find();
  return res.send(users);
};
const getUserByid = async (req, res,next) => {
  let id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)){
    let error=new Error("Invalid User Id")
    return next(error)
  }
  const user = await User.findById({ _id: id });
  if (!user) {
    const error=new Error("User not found")
    error.statusCode=404;
    return next(error)
  }
  return res.send(user);
};
const createUser = async (req, res, next) => {
  try {
    const { name, userName, phone, profilePic, password, bio, balance } = req.body;

    if (!password) {
      const error = new Error("Password is required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ userName:userName?userName:phone });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      userName:userName?userName:phone,
      phone,
      profilePic,
      password: hashedPassword,
      bio,
      balance,
    });

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUserByid,
  createUser,
  getUsers,
};
