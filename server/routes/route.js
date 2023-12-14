import express from "express"
import dotenv from "dotenv"
dotenv.config();
import { login,signup,guest, getUser } from "../controllers/authController.js";
import { auth,isAdmin,isStudent } from "../middlewares/auth.js";
import { userModel } from "../models/user.model.js";
const router = express.Router();
// protected routes || middlewares or controller to handle it
router.get("/student",  auth, isStudent,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to Student Dashboard",
    });
});
router.get("/admin",  auth, isAdmin,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to Admin Dashboard",
    });
});
router.post("/signup",auth,isAdmin,signup);

// get all Student
router.get("/user",auth,isAdmin,getUser);
    // try
    // {
    //     let user = await userModel.find({role:"Student"});
    //     if(user)
    //     {
    //         // user found
    //         return res.status(200).json({
    //             success:true,
    //             message:"Fetched",
    //             user,
    //         });

    //     }
    //     else
    //     {
    //         // user not found
    //         return res.status(400).json({
    //             success:false,
    //             message:"No users found",
    //         });
    //     }
    // }
    // catch(error)
    // {
    //     console.error(error);
    //     return res.status(500).json({
    //         success:false,
    //         message:"Unable to fetch users"
    //     });
    // }




router.post("/guest", guest);
router.post("/login",login);



export default router;