import express from "express"
import dotenv from "dotenv"
dotenv.config();
import { login,signup,guest } from "../controllers/authController.js";
import { auth,isAdmin,isStudent } from "../middlewares/auth.js";
const router = express.Router();
// middlewares or controller to handle it
router.post("/guest", guest);
router.get("/student",  auth, isStudent);
router.get("/admin",  auth, isAdmin);


router.post("/login",login);
router.post("/signup",isAdmin,signup);


export default router;