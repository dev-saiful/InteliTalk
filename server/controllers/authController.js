import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {chain} from "../models/guest.model.js"
import { userModel } from "../models/user.model.js";
import "dotenv/config";

export const signup = async(req,res)=>{

}


export const login = async(req,res)=>{
   try 
   {
      // getting info from request body
      // const {email,password,role} = req.body;
      const email = req.body.email;
      const password = req.body.password;
      console.log(email,password);
      // checking empty
      if(!email || !password)
      {
         return res.status(400).json({
            success:false,
            message:"Fill Must be filled up",
         });
      }

      let user = await userModel.findOne({email});
      // check email
      if(!email)
      {
         return res.status(400).json({
            success:false,
            message:"Email not exists",
         });
      }
      const payload = {
         email:user.email,
         id:user._id,
         role:user.role,
     };

      // check password
      if(password === user.password)
      {
         // password match

         // create token
         let token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
         });
         user = user.toObject();
         user.token = token;
         user.password = undefined;
         const options = {
            expires: new Date(Date.now()+30000),
            httpOnly:true,
         };

         // creating cookie
         res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"User Logged in Successfully",
         });
     
         
      }
      else
      {
         // password mismatch
         return res.status(400).json({
            success:false,
            message:"Password Mismatch",
         });
      }
      // if(role === "Admin")
      // {
      //    // role match -> show role based message
      //    return res.status(200).json({
      //       success:true,
      //       message:"User Logged in Successfully",
      //    });
      // }
   } 
   catch (error)
   {
      console.log(error);
      return res.status(500).json({
         success:false,
         message:"Login failed",
      });
   }
   


}


export const guest = async(req,res)=>{
    const question = req.body.question;
    console.log(question);
    if(question)
    {
       const ans =  await chain.call({
        query:question,
        });
        console.log(ans.text);
       return res.status(200).json({
        success:true,
        message:"Answer is given",
        ans,
       });
    }
    else
    {
       return res.status(400).json({
        success:false,
        message:"Something went wrong",
       });
    }
}