import express from "express"
import dotenv from "dotenv"
dotenv.config();
import { studentController } from "../controllers/studentController.js";
import {guestController} from "../controllers/guestController.js";
import { adminController } from "../controllers/adminController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/guest", guestController);
router.get("/student",  auth, studentController);
router.get("/admin",  auth, adminController);


router.post("/login",login);


export default router;