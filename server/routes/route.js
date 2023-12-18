import express from "express"
import dotenv from "dotenv"
dotenv.config();
import { login,signup,guest, getUsers, getUser } from "../controllers/authController.js";
import { auth,isAdmin,isStudent } from "../middlewares/auth.js";
// import path from "node:path";
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const router = express.Router();


router.get("/",(req,res)=>{
    res.render("index");
});
// protected routes || middlewares or controller to handle it
router.get("/student",  auth, isStudent,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to Student Dashboard",
    });
});
router.get("/admin",  auth, isAdmin,(req,res)=>{
    //  res.render("admin");
    return res.status(200).json({
        success:true,
        message:"Welcome to Admin Dashboard",
    });
});
router.post("/signup",auth,isAdmin,signup);

// get all Student
router.get("/user",auth,isAdmin,getUsers);
router.get("/user/:id",getUser);

router.post("/guest", guest);
router.post("/login",login);



export default router;