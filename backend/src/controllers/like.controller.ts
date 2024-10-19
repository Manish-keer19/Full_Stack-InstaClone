import { Request, Response } from "express";
import { Like } from "../models/Likes.model";
import { Post } from "../models/Post.model";
import { User } from "../models/User.model";
import { Error } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const createLike = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    // Fetch the data from postId
    const { postId } = req.body;
    console.log("postId is", postId);

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "postId is required",
      });
    }

    const ispostExist = await Post.findOne({ _id: postId });
    if (!ispostExist) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    // Fetch the user data from req.user
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    console.log("user is", user);

    // Create entry in db
    const newLike = await Like.create({
      user: user.id,
      post: postId,
    });

    // Update the User model
    const newUser = await User.findOneAndUpdate(
      { email: user.email },
      { $push: { likes: newLike._id } },
      { new: true }
    );
    console.log("newUser is", newUser);
    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the Post model
    const newPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { likes: newLike._id } },
      { new: true }
    );
    console.log("newPost is", newPost);

    // Return response
    return res.status(200).json({
      success: true,
      message: "Like created successfully",
    });
  } catch (error) {
    console.log("Could not create the like", error);
    return res.status(400).json({
      success: false,
      message: "Could not create the like",
    });
  }
};

export const deleteLike = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const { postId, likeId } = req.body;
    if (!postId || !likeId) {
      return res.status(400).json({
        success: false,
        message: "postId and likeId are required",
      });
    }
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "postId is required",
      });
    }

    const ispostExist = await Post.findOne({ _id: postId });
    if (!ispostExist) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    const isLikeExist = await Like.findOne({ _id: likeId });
    console.log("isLikeExist", isLikeExist);
    if (!isLikeExist) {
      return res.status(400).json({
        success: false,
        message: "Like not found",
      });
    }
    //  update the post model delete like
    const newPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: { likes: likeId },
      },
      { new: true }
    );
    console.log("newpost after delete like is ", newPost);
    if (!newPost) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    //  update the user model delete like
    const newUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        $pull: { likes: likeId },
      },
      { new: true }
    );

    const deletedLike = await Like.findOneAndDelete({ _id: likeId });
    console.log("deletedLike", deletedLike);
    if (!deletedLike) {
      return res.status(400).json({
        success: false,
        message: "like delete nahi ho saki",
      });
    }

    console.log("new user after delete like is ", newUser);
    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Like deleted successfully",
    });
  } catch (error: any) {
    console.log("could not delete the like ", error);
    return res.status(400).json({
      success: false,
      message: "could not delete the like",
      error: error.message,
    });
  }
};
