import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const auth = async(req,res,next)=>{
    let token = req.cookies.token;
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.user._id).
            select("-password");
            next();
        } catch (error) {
            // res.status(400)
            // throw new Error('Not authorized, invalid token');
            
        }
    } else{
        res.status(400).json({message:'Unauthorized Access'})
        // throw new Error('Not authorized, invalid token');
    }
    
}

export {auth};