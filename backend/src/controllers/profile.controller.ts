import { Request, Response } from "express";
import { Profile } from "../models/Profile.model";
import { User } from "../models/User.model";

export const editProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Extract data from request body
    const { name, username, bio, pronoun, email } = req.body;

    console.log("name is ", name);
    console.log("username is ", username);
    console.log("email is ", email);
    console.log("bio is ", bio);
    console.log("pronoun is ", pronoun);

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
