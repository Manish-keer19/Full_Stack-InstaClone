import { Request, Response } from "express";
import { User } from "../models/User.model";;

export const createUser = async (req: Request, res: Response): Promise<any> => {
  console.log("req.body is ", req.body);

  try {
    // Destructure data from req.body
    const { username, email, password } = req.body;

    console.log("username is ", username);
    console.log("email is ", email);
    console.log("password is ", password);
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create a new user entry in the database
    const newUser = await User.create({
      username,
      email,
      password,
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: unknown) {
    console.error("Error while creating user:", error);

    // Handle known error types
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }

    // For unknown error types
    return res.status(500).json({
      success: false,
      message: "Unknown error occurred",
    });
  }
};

export const getuserdata = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log("req.body is ", req.body);

  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    }
    // Fetching all user data from the database
    const newuserdata = await User.findOne({ email: email })
      .populate("profile")
      .exec();

    console.log("data in getuserdata is ", newuserdata);
    if (!newuserdata) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      userdata: newuserdata,
    });
  } catch (error: unknown) {
    console.error("Error while fetching user data:", error);

    // Handle known error types
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }

    // For unknown error types
    return res.status(500).json({
      success: false,
      message: "Unknown error occurred",
    });
  }
};
