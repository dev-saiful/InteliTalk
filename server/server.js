import 'dotenv/config';
import express from 'express';
import path from "node:path";
import router from "./routes/route.js"
import {  mongoConnect } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorhandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5001
// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//  route mount
app.use("/api/v1",router);

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production")
{
    // set static folder
    app.use(express.static(path.join(__dirname,"..","/client/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"..","client","dist","index.html"));
    });
}
else
{
    app.get("/",(req,res)=>{
        res.send("Api is running");
    });
}

app.all("*",errorhandler);
// app.all("*",errorhandler);
// server active
async function startServer()
{
    await mongoConnect();
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
       
    });
}

startServer();