const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

const adminMiddleware=async(req,res,next)=>{
   
let token=req.headers.authorization.split(' ')[1];

jwt.verify(token,process.env.JWT_SECRET_KEY,async function(err,decode){
if(err){
    res.status(400).json({err})
}
if(decode){
    if(decode.role==='admin')next()
    
}
})

}

module.exports=adminMiddleware