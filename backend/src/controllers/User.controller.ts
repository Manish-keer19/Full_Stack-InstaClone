import { Request, Response } from "express";
import { User } from "../models/User.model";

export const getuserFulldata = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log("req.body is ", req.body);

  try {
    const { email } = req.body;
    console.log("email is", email);

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    }
    // Fetching all user data from the database
    const newuserdata = await User.findOne({ email: email }, {}, { new: true })
      .populate("posts")
      .populate("likes")
      .populate("comment")
      .populate("saved")
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
