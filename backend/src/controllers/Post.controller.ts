import { Post } from "../models/Post.model";
import { User } from "../models/User.model";
import { uploadInCloudinary } from "../utils/cloudinary.utils";

export const createPost = async (req: any, res: any) => {
  // fetch the caption ,image and location
  // validate it
  // put the image in cloudinary
  //  creaete post entry in db
  // return post

  try {
    // fetch the caption ,image and location
    const { caption, location } = req.body;
    console.log("caption is ", caption);
    console.log("location is ", location);
    console.log("req.files is ", req.files.image);
    const image = req.files.image;
    console.log("image is ", image);
    // validate it
    if (!caption || !location || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // put the image in cloudinary
    const imgres = await uploadInCloudinary({
      data: image.tempFilePath,
      folder: "posts",
    });
    console.log("image res is ", imgres);
    //  creaete post entry in db
    const newPost = await Post.create({
      caption: caption,
      image: imgres?.secure_url,
      location: location,
      user: req.user._id,
    });
    // return res
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log("could not create post", error);
    return res.status(500).json({
      success: false,
      message: "could not create post",
    });
  }
};
