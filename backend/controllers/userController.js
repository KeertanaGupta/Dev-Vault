//backend/controllers/userController.js

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

const registerUser = asyncHandler (async (req, res) => {
  const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

const getUserProfile = asyncHandler(async (req, res) => {
  // Our 'protect' middleware already found the user and attached it to 'req.user'
  // If we get here, the user is authenticated.
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

export { registerUser, loginUser, logoutUser, getUserProfile };