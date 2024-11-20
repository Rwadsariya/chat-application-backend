import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { renameSync, unlinkSync } from "fs";
import path from 'path';


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: " Email and pasword are required..",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email is already in use.",
      });
    }
    const user = await User.create({
      email,
      password,
    });
    res.cookie("JWT", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstname: user.firstname,
        lastname: user.lastname,
        color: user.color,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal Server error",
    });
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: " Email and pasword are required..",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User with given email not found.",
      });
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(404).json({
        message: "Password is incorrect.",
      });
    }
    res.cookie("JWT", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        firstname: user.firstname,
        lastname: user.lastname,
        color: user.color,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal Server error",
    });
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    console.log(req.userId);
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User with given id not found.");
    }

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      firstname: userData.firstname,
      firstname: userData.firstname,
      lastname: userData.lastname,
      color: userData.color,
      image: userData.image,
      profileSetup: userData.profileSetup,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    console.log(req.body);
    const { firstname, lastname, color } = req.body;

    if (!firstname && !lastname) {
      return res.status(400).send("firstname lastname and color is required");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstname,
        lastname,
        color,
        profileSetup: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      firstname: userData.firstname,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
      profileSetup: userData.profileSetup,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};

export const addProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required.");
    }

    const date = Date.now();
    let filename = `upload/profiles/${date}${req.file.originalname}`;
    renameSync(req.file.path, filename);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: filename },
      { new: true, runValidators: true }
    );
    
    return res.status(200).json({
      image: updatedUser.image
    })

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};

export const removeProfileImage = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).send("User not found")
    }

    if(user.image){
      unlinkSync(user.image)
    }

    user.image = null;
    await user.save();

    return res.status(200).send("Profile Image removed successfully")
    
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};

export const logout = async (req, res, next) => {
  try {
      res.clearCookie("JWT",{
        maxAge: 0,
        secure:true,
        sameSite:"None"
      })
      console.log(res.cookie)
    return res.status(200).send("Logout successful")
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};
