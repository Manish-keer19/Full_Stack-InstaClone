import { User } from "../models/User.model";
import { Request, Response } from "express";
import optgenerator from "otp-generator";
import { Otp } from "../models/otp";
import bcrypt from "bcrypt";

// Generate OTP
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
        message: "email is required",
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

    // Save OTP to database
    const newOtp = await Otp.create({
      email: email,
      otp: otp,
    });

    console.log("newOtp is ", newOtp);

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp, // Returning the generated OTP
      newOtp,
    });
  } catch (error) {
    console.log("error while generating otp", error); // Added error logging
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating OTP",
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
