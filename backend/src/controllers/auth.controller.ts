import { User } from "../models/User.model";
import { Request, Response } from "express";
import optgenerator from "otp-generator";
import { Otp } from "../models/otp";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fetchAllDetailsUser } from "../utils/fetchAllDetailsUser";
dotenv.config();

// generate otp
export const generateOtp = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    console.log("email is ", email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Generate OTP
    const otp = optgenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp is ", otp);

    // Check if an OTP exists for the email
    const existingOtp = await Otp.findOne({ email: email });

    if (existingOtp) {
      // Update existing OTP
      existingOtp.otp = otp;
      await existingOtp.save(); // Save the updated OTP
      console.log("Updated OTP for existing user");
    } else {
      // Save new OTP to database
      await Otp.create({ email: email, otp: otp });
      console.log("Created new OTP for user");
    }

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp, // Optionally return the generated OTP
    });
  } catch (error) {
    console.log("error while generating OTP", error); // Added error logging
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating OTP",
    });
  }
};

export const IsUsernameAlreadyTaken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { username } = req.body;
    console.log("username is ", username);

    // Check if username is provided
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    // Trim whitespace from username
    const trimmedUsername = username.trim();
    console.log("trimmed username is ", trimmedUsername);

    // Check if trimmed username contains spaces
    if (trimmedUsername !== username) {
      return res.status(400).json({
        success: false,
        message: "Username must not contain spaces",
      });
    }

    // Check if username already exists in the database
    const isUsernameTaken = await User.findOne({ username: trimmedUsername });

    if (isUsernameTaken) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken. Please choose another one",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Username is available",
    });
  } catch (error) {
    console.log("Some error occurred during checking username:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while checking username",
      error,
    });
  }
};

export const Signup = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("req.body is ", req.body);
    const { username, email, password, otp } = req.body;
    console.log("username is ", username);
    console.log("email is ", email);
    console.log("password is ", password);
    console.log("otp is ", otp);

    if (!username || !email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const IsUser = await User.findOne({ email: email });

    if (IsUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const dbotp = await Otp.findOne({ email: email });
    console.log("dbotp is ", dbotp);

    if (dbotp?.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      profilePic: `https://ui-avatars.com/api/?name=${username}+${username}&background=random&color=000`,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("error is ", error);
    return res.status(500).json({
      success: false,
      message: "could not signup the user",
    });
  }
};

export const Login = async (req: Request, res: Response): Promise<any> => {
  console.log("req.body is ", req.body);
  try {
    const { email, password } = req.body;
    console.log("email is ", email);
    console.log("password is ", password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isUserExist = await User.findOne({ email: email }, {}, { new: true });

    console.log("isuserExitst is ", isUserExist);
    if (!isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      id: isUserExist._id,
      email: isUserExist.email,
    };

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is not defined",
      });
    }

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1d",
    });
    const user = isUserExist.toObject();
    user.token = token;
    user.password = "";

    console.log("user is ", user);

    const userdata = await fetchAllDetailsUser(email);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      userdata,
      token
    });
  } catch (error) {
    console.log("could not login the user", error);
    return res.status(500).json({
      success: false,
      message: "could not login the user",
    });
  }
};
