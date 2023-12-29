import mongoose from "mongoose";
import "dotenv/config";

export const dbConnect = (req,res)=>{
    try
    {
        mongoose.connect(process.env.MONGODB_URL)
        .then(console.log("MongoDB connected successfully!!!"))
        .catch((err)=>{
            console.log("Failed to connect Database");
            process.exit(1);
        });
    }
    catch(error)
    {
        console.error(error);
    }
}