import express from "express"
import dotenv from "dotenv"
dotenv.config();
import { login,signup,guest } from "../controllers/authController.js";
import { auth,isAdmin,isStudent } from "../middlewares/auth.js";
const router = express.Router();
// protected routes || middlewares or controller to handle it
router.get("/student",  auth, isStudent);
router.get("/admin",  auth, isAdmin,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to Admin Dashboard",
    });
});

router.post("/guest", guest);
router.post("/login",login);
router.post("/signup",isAdmin,signup);


export default router;