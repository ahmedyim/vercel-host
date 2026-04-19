const mongoose = require("mongoose");
const User = require("../models/user.model");

 
const transfer = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { senderId, receiverId, amount } = req.body;

    //  Get users inside session
    const sender = await User.findById(senderId).session(session);
    const receiver = await User.findById(receiverId).session(session);

    if (!sender || !receiver) {
      throw new Error("User not found");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient balance");
    }

    // Update balances
    sender.balance -= amount;
    await sender.save({ session });

    receiver.balance += amount;
    await receiver.save({ session });

    //  Commit if everything works
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Transfer successful" });

  } catch (error) {
    //  Rollback if error happens
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
module.exports={transfer}