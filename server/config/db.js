import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URL = process.env.MONGODB_URL;

mongoose.connection.once("open",()=>{
    console.log("MongoDB connected successfully!!!");
});

mongoose.connection.on("error",(err)=>{
    console.error(err);
});

export async function mongoConnect()
{
    await mongoose.connect(MONGO_URL,{});
}

export async function mongoDisConnect()
{
    await mongoose.disconnect();
}