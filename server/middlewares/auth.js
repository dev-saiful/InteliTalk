import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { userModel } from "../models/user.model.js";


export const auth = async(req,res,next)=>{
    try
    {
        // token retrive from cookies or header
        const token = req.cookies.token || req.header("Authorization").replace("Bearer","");
        if(!token || token === undefined)
        {
            return res.status(401),json({
                success:false,
                message:"Token is missing",
            });
        }

        // verifying token
        try
        {
            // decode token
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            req.user = payload;
        }
        catch(err)
        {
            return res.status(401).json({
                success:false,
                message:"Invalid token",
            });
        }
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying token",
        });
    }
}

export const isAdmin = (req,res,next)=>{
    try
    {
        if(req.user.role !== "Admin")
        {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin",
            });
        }
        next();
    }
    catch (error)
    {
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        });
    }
}

export const isStudent = (req,res,next)=>{
    try
    {
        if(req.user.role !== "Student")
        {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Student",
            });
        }
        next();
    }
    catch (error)
    {
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        });
    }
}
