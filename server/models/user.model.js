import mongoose from "mongoose";
import { mailSend } from "../config/configMail.js";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin","Student"],
    }
});
// send mail successfully register
userSchema.post("save",mailSend);

export const userModel = mongoose.model("User",userSchema);