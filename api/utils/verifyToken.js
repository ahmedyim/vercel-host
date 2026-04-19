const jwt = require("jsonwebtoken")
const verifyToken=(token)=> {
 let decode=jwt.verify(token,(process.env.SECRET_KEY).toString())
return decode
}
module.exports={verifyToken}