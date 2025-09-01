// the main task of this middleware function to extract the payload from token which is coming in each request from cookies and the payload having the userid which is needed in the req.body so that the controller function of sendverifyotp and verifemail can extract the userid and do task for that user only .

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const authMiddleware= async (req,res,next)=>{
    let token = req.cookies?.token;

    // console.log("token from the middleware",{token});

    if(!token){
        return res.json({success:false, message:"Token not found in cookies, Login Again!"});
    }

  try {
    const decodedPayload =  jwt.verify(token,process.env.SECRET_KEY);

console.log("decodedpayload from middl:",decodedPayload);
    if(decodedPayload.id){
       req.user= {id:decodedPayload.id};
      //  console.log("userid from middleware",req.user.id);

    }else{
        return res.json({success:false, message:"Not authorized login again!"});
    }

next();
         
  } catch (error) {
    return res.status(500).json({success:false, message:error.message});
  }

}
export default authMiddleware;
