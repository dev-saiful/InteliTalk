import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {chain} from "../models/guest.model.js"

export const signup = (req,res)=>{

}


export const login = (req,res)=>{
    
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