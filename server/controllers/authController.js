import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { userModel } from "../models/user.model.js";
import "dotenv/config";

export const signup = async (req, res) => {
  try {
    // getting student info
    let { name, email, password, confirmPassword, role } = req.body;
    // console.log(name, email, password, confirmPassword, role);
    // check filed is empty or not
    let checkEmpty = (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(role));
    let passEmpty = validator.isEmpty(password) || validator.isEmpty(confirmPassword);
    if(passEmpty)
    {
      password = "123456";
      confirmPassword = "123456";
    }
    if (checkEmpty){
      return res.status(400).json({
        success: false,
        message: "Fill must be filled up",
      });
    }
    // email validation
    if(!validator.isEmail(email))
    {
      return res.status(400).json({
        success:false,
        message:"Invalid Email",
      });
    }
    // checking email already registered or not
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered! Try different Email",
      });
    }

    // checking password and confirm password matched or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password mismatch.Please check your passwords",
      });
    }

    // hashing password
    let hashPass;
    try {
      hashPass = await bcrypt.hash(password, 10);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while password hashing",
      });
    }
    // creating user
    let user = await userModel.create({
      name,
      email,
      password: hashPass,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created Successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Unable to create user, try again later",
    });
  }
};

export const login = async (req, res) => {
  try {
    // getting info from request body
    // const {email,password,role} = req.body;
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);

    // checking empty
    if (validator.isEmpty(email)||validator.isEmpty(password)) {
      return res.status(400).json({
        success: false,
        message: "Fill Must be filled up",
      });
    }
    // check email is valid or not
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Address",
      });
      // throw new Error("Invalid Email Address");
    }
    let user = await userModel.findOne({ email });
    // check email
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not exists",
      });
    }
    const payload = {
      id: user._id,
      role: user.role,
    };

    // check password
    if (await bcrypt.compare(password, user.password)) {
      // password match

      // create token
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      };

      // creating cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Logged in Successfully",
      });
    } else {
      // password mismatch
      return res.status(400).json({
        success: false,
        message: "Password Mismatch",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

//  get all users
export const getUsers = async (req, res) => {
  try {
    let user = await userModel.find({ role: "Student" });
    if (user) {
      // user found
      return res.status(200).json({
        success: true,
        message: "Fetched",
        user,
      });
    } else {
      // user not found
      return res.status(400).json({
        success: false,
        message: "No users found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch users",
    });
  }
};

//  get user by id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
// check user found or not
    if (user.role==="Student") {
      return res.status(200).json({
        success:true,
        message:"User Found",
         userData 
        });
    }
    else
    {
      return res.status(400).json({
        success:false,
        message:"User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success:false,
      message:"Failed to find user",
    });
  }
};

// Update User
export const updateUser = async(req,res)=>{
  try
  {
    const { id } = req.params;
    const {name,email} = req.body;
    // checking input field is not empty
    const checkField = validator.isEmpty(name) || validator.isEmpty(email);
    if(checkField)
    {
      return res.status(400).json({
        success:false,
        message:"Fill the input field",
      });
    }
    // checking valid email address
    const checkEmail = validator.isEmail(email);
    if(!checkEmail)
    {
      return res.status(400).json({
        success:false,
        message:"Invalid Email Address",
      });
    }
    // updating information
    const user = await userModel.findOneAndUpdate({_id:id},{name:name,email:email},{
      new:true,
    });
    if(user)
    {
      return res.status(200).json({
        success:true,
        message:"User information is updated",
      });
    }
    else
    {
      return res.status(404).json({
        success:false,
        message:"No user exists with this information",
      })
    }
  }
  catch(err)
  {
    console.log(err)
    return res.status(500).json({
      success:false,
      message:"Failed to update user",
    });
  }
}