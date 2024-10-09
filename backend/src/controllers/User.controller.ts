import { Request, Response } from "express";
import { User } from "../models/User.model";
import { Profile } from "../models/Profile.model";

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


export const editProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    // Extract data from request body
    const { name, username, bio, pronoun, email } = req.body;

    // Validate the incoming data
    if (!email || !name || !username || !bio || !pronoun) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).populate("profile");
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.profile) {
      // Profile exists, update the profile
      const updatedProfile = await Profile.findOneAndUpdate(
        { _id: user.profile }, // Match the profile by its ID
        { name, username, bio, pronoun }, // Update the profile fields
        { new: true } // Return the updated document
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } else {
      // No profile exists, create a new one
      const newProfile = await Profile.create({
        name,
        username,
        bio,
        pronoun,
        email: user.email, // Optional: Attach email to the profile if needed
      });

      // Update the user to reference the new profile
      user.profile = newProfile._id;
      await user.save(); // Save the updated user with the new profile reference

      return res.status(201).json({
        success: true,
        message: "Profile created successfully",
        data: newProfile,
      });
    }
  } catch (error) {
    console.error("Error in editProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Could not update profile",
    });
  }
};

