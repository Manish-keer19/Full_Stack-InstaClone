import { Request, Response } from "express";
import { User } from "../models/User.model";
import mongoose from "mongoose";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

// export const FollowUser = async (req: Request, res: Response): Promise<any> => {
//   // fetch the token and userId where current user want to follow that user
//   // fecht the current user id  from req.user.id
//   // validate all of these
//   // check if user exists based on userId
//   // add following array of current user
//   // and also addd folowers array of another user that has been followed
//   // save both of them
//   // return success response

//   try {
//     const authenticatedReq = req as AuthenticatedRequest;
//     const { userId, token } = req.body;

//     console.log("userid is ", userId);
//     console.log("token is ", token);
//     //  validate
//     if (!userId || !token) {
//       return res.status(400).json({
//         success: false,
//         message: "all filed are required",
//       });
//     }

//     console.log("authuser is ", authenticatedReq.user);
//     const currentUserId = authenticatedReq.user.id;
//     console.log("currentuserId", currentUserId);

//     if (!currentUserId) {
//       return res.status(400).json({
//         success: false,
//         message: "currentUserId is required",
//       });
//     }

//     const iscurrenuserExist = await User.findOne({ _id: currentUserId });

//     if (!iscurrenuserExist) {
//       return res.status(400).json({
//         success: false,
//         messaage: "current user is not found",
//       });
//     }

//     if (iscurrenuserExist.following == userId) {
//       return res.json({
//         success: false,
//         message: "you have already followed the user",
//       });
//     }

//     const isUserExist = await User.findOne({ _id: userId });
//     if (!isUserExist) {
//       return res.status(400).json({
//         success: false,
//         message: "follower user not found",
//       });
//     }

//     // add following array of current user
//     const currentUser = await User.findByIdAndUpdate(
//       currentUserId,
//       {
//         $push: {
//           following: userId,
//         },
//       },
//       { new: true }
//     );

//     console.log("current user is ", currentUser);

//     if (!currentUser) {
//       return res.json({
//         success: false,
//         message: "current user is null",
//       });
//     }

//     // update the followers array of another user that has been followed

//     const anotherUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         $push: {
//           followers: currentUserId,
//         },
//       },
//       { new: true }
//     );
//     console.log("another user is ", anotherUser);

//     if (!anotherUser) {
//       return res.json({
//         success: false,
//         message: "another  user is null",
//       });
//     }

//     // succes res

//     return res.status(200).json({
//       success: true,
//       message: "suceesfully follow the user ",
//     });
//   } catch (error) {
//     console.log("could not follow the user", error);
//     return res.status(500).json({
//       success: false,
//       message: "Could not follow the user",
//     });
//   }
// };

export const FollowUser = async (req: Request, res: Response): Promise<any> => {
  // fetch the token and userId where current user wants to follow that user
  // fetch the current user id from req.user.id
  // validate all of these
  // check if user exists based on userId
  // add following array of current user
  // and also add followers array of another user that has been followed
  // save both of them
  // return success response

  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const { userId, token } = req.body;

    console.log("userid is ", userId);
    console.log("token is ", token);
    // validate
    if (!userId || !token) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    console.log("authuser is ", authenticatedReq.user);
    const currentUserId = authenticatedReq.user.id;
    console.log("currentuserId", currentUserId);

    if (!currentUserId) {
      return res.status(400).json({
        success: false,
        message: "currentUserId is required",
      });
    }

    const isCurrentUserExist = await User.findOne({ _id: currentUserId });

    if (!isCurrentUserExist) {
      return res.status(400).json({
        success: false,
        message: "current user is not found",
      });
    }

    if (isCurrentUserExist.following == userId) {
      return res.json({
        success: false,
        message: "you have already followed the user",
      });
    }

    const isUserExist = await User.findOne({ _id: userId });
    if (!isUserExist) {
      return res.status(400).json({
        success: false,
        message: "follower user not found",
      });
    }

    // add following array of current user
    const currentUser = await User.findByIdAndUpdate(
      currentUserId,
      {
        $push: {
          following: userId,
        },
      },
      { new: true }
    );

    console.log("current user is ", currentUser);

    if (!currentUser) {
      return res.json({
        success: false,
        message: "current user is null",
      });
    }

    // update the followers array of another user that has been followed

    const anotherUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          followers: currentUserId,
        },
      },
      { new: true }
    );
    console.log("another user is ", anotherUser);

    if (!anotherUser) {
      return res.json({
        success: false,
        message: "another user is null",
      });
    }

    // success response

    return res.status(200).json({
      success: true,
      message: "successfully followed the user",
    });
  } catch (error) {
    console.log("could not follow the user", error);
    return res.status(500).json({
      success: false,
      message: "Could not follow the user",
    });
  }
};

export const UnFollowUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  //  fetch the target user id that want to unfollow from req.body
  //  fetch the current user id that want to unfollowe the targetUser
  // validtae both
  // remove followings array from currentuser
  // remove followerss array from target user
  // return success response

  try {
    const authenticatedReq = req as AuthenticatedRequest;

    const { userId, token } = req.body;
    console.log("userId", userId);
    console.log("token is ", token);

    if (!userId || !token) {
      return res.json({
        success: false,
        message: "userId and token both required",
      });
    }

    const currentUserId = authenticatedReq.user.id;
    console.log("currntUserId is ", currentUserId);

    if (!currentUserId) {
      return res.json({
        success: false,
        message: "currentUserIs is undifiend",
      });
    }

    const isUserExist = await User.findById(userId);
    console.log("isuserExist is ", isUserExist);

    if (!isUserExist) {
      return res.json({
        success: false,
        message: "target user not found",
      });
    }

    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.json({
        success: false,
        message: "current user not found",
      });
    }

    if (!isUserExist.followers.includes(currentUser?._id)) {
      return res.json({
        success: false,
        message: "you are not following the user how can you unfollowe it",
      });
    }

    // remove the target user from following array of currentuser

    const newcurrentUser = await User.findByIdAndUpdate(
      currentUserId,
      {
        $pull: {
          following: userId,
        },
      },
      { new: true }
    );

    console.log("newcurrent user is ", newcurrentUser);

    if (!currentUser) {
      return res.json({
        success: false,
        message: "current user is null unfollow nahi ho saka",
      });
    }

    // remove the currentuserId from followers array in targetarray
    const targetUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          followers: currentUserId,
        },
      },
      { new: true }
    );

    console.log("targetuser is ", targetUser);

    if (!targetUser) {
      return res.json({
        success: false,
        message: "target  user is null unfollow nahi ho saka",
      });
    }

    // return success response
    return res.status(200).json({
      success: true,
      message: "Unfollower the user successfully",
    });
  } catch (error) {
    console.log("could not unfollowe the user");
    return res.status(400).json({
      success: false,
      message: "could not unfollowe the target user",
    });
  }
};

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
      .populate("profile")
      .populate("followers")
      .populate("following")
      .populate("userStories")
      .populate("folowersStories")
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

export const searchUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { searchTerm } = req.body;
    console.log("searchTerm is ", req.body);
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: "Search term is required",
      });
    }
    const users = await User.find(
      {
        username: { $regex: searchTerm, $options: "i" }, // Case-insensitive search
      },
      {},
      { new: true }
    )
      .populate("posts")
      .populate("likes")
      .populate("comment")
      .populate("saved")
      .populate("followers")
      .populate("following")
      .populate("folowersStories")
      .populate("profile")
      .exec();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while searching users",
      error,
    });
  }
};
