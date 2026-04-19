const express = require("express");
const { DB } = require("./config/db.config");
const messagesRoute = require("./routes/messagesRoutes");
const userRoute = require("./routes/userRoutes");
const groupRoute = require("./routes/groupRoute");
const cookieParser = require("cookie-parser")
const errorHandler=require("./MiddleWare/errorHandler")
require("dotenv").config()
var cors = require('cors')
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
// app.use()

//routes
app.use("/api/messages", messagesRoute);
app.use("/api/users", userRoute);
app.use("/api/groups", groupRoute);
app.use(errorHandler)

const PORT = 4000;
app.listen(PORT, () => {
  DB();
  console.log("app is runinng");
});
