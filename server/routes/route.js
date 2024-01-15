import express from "express"
import dotenv from "dotenv"
dotenv.config();
import { login, signup, getUsers, getUser, updateUser } from "../controllers/authController.js";
import {  student,guest  } from "../controllers/ansController.js";
import { auth,isAdmin,isStudent } from "../middlewares/auth.js";
// import path from "node:path";
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const router = express.Router();

/**
* @desc Home Page
* @route GET "http://localhost:5001/api/v1"
*/
router.get("/",(req,res)=>{
    res.render("index");
});

/**
* @desc protected routes || middlewares or controller to handle it
 * @desc Student Dashboard
 * @route GET "http:localhost:5001/api/v1/student"
 */
// router.get("/student",  auth, isStudent,student);
/**
* @desc Admin Dashboard
* @route GET "http:localhost:5001/api/v1/admin"
*/
router.get("/admin",  auth, isAdmin,(req,res)=>{
    //  res.render("admin");
    return res.status(200).json({
        success:true,
        message:"Welcome to Admin Dashboard",
    });
});
/**
* @desc SignUp page. Only Admin can register new Student
* @field name,email,password,confirmPassword,role
* @route POST "http://localhost:5001/api/v1/signup"
*/
router.post("/signup",auth,isAdmin,signup);
/**
* @desc Get all user information. Only Admin can view this.
* @route GET "http://localhost:5001/api/v1/user"
*/
router.get("/user",auth,isAdmin,getUsers);
/**
* @desc GET Individual User Information. Only Admin can view this.
* @route GET "http://localhost:5001/api/v1/user/{{id}}"
*/
router.get("/user/:id",auth,isAdmin,getUser);
// TODO: update user info
router.put("/user/:id",auth,isAdmin,updateUser);
/**
* @desc Guest Question Answer
* @route POST "http://localhost:5001/api/v1/guest"
*/
// router.post("/guest", guest);
/**
* @desc Login 
* @field email,password
* @route GET "http://localhost:5001/api/v1/login"
*/
router.post("/login",login);



export default router;