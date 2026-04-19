const jwt =require("jsonwebtoken")
const authMiddleWare=(req,res,next)=>{
     let token = req.cookies["mizan-cookie"];
     if(!token){
        return res.status(401).json({ message: "Unauthorized. No token provided." });
     }
     console.log(token)
    try{
    let decode = jwt.verify(token,(process.env.SECRET_KEY).toString());
     let id=decode._id
     req._id=id
     next()
    }catch(error){
       return res.status(401).json({ message: "Invalid or expired token" });
    }
}
module.exports=authMiddleWare;