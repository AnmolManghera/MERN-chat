import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/authMiddleware.js";
//@desc auth user / set token
//route POST /api/users/auth
//@access Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isValid = await bcrypt.compare(password,user.password);

    user.password = undefined;
    if (user && isValid) {
      const userId = user._id;
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
  
        res.status(201).cookie("token", token,{
          httpOnly:true,
          maxAge : 30*24*60*60*1000
        }).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        throw new Error("Invalid Email or Password");
      }

  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email});

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    user.password = undefined;
    if (user) {
      const userId = user._id;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      
      res
      .status(201)
      .cookie("token", token,{
        httpOnly:true,
        maxAge : 30*24*60*60*1000
      })
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      console.error('Error reg user')
    }
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.cookie('token','',{
        httpOnly:true,
        expires:new Date(0)
    }).status(200).json({message:"User logged out"})
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else{
        res.status(404);
        throw new Error('User not found')
    }
  } catch (error) {
    next(error);
  }
};

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
