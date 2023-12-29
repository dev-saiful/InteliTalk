import 'dotenv/config';
import express from 'express';
import path from "node:path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import router from "./routes/route.js"
import { dbConnect } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8001
// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.set("views","./views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,".","public")));
// connect to db
dbConnect();
//  route mount
app.use("/api/v1",router);
// app.get("/*",(req,res)=>{
//     res.sendFile(path.join(__dirname,".","public","index.html"));
// });
// server active
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
   
});