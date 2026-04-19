const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  let token = jwt.sign({ _id: id },(process.env.SECRET_KEY).toString(), {
    expiresIn:"1d",
  });
  return token;
};
module.exports = { generateToken };
