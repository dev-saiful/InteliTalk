import 'dotenv/config';
import express from 'express';
import router from "./routes/route.js"

const app = express();
const PORT = process.env.PORT || 8001
// middleware
app.use(express.json());

//  route mount
app.use("/api/v1",router);
// server active
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
   
});