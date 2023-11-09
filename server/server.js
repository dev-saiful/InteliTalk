import 'dotenv/config';
import express from 'express';
import router from "./routes/route.js"
import { dbConnect } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 8001
// middleware
app.use(express.json());
// connect to db
dbConnect();
//  route mount
app.use("/api/v1",router);
// server active
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
   
});