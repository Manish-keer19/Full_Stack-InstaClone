import { profile } from "console";
import mongoose, { Schema } from "mongoose";

const userschema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: {
    type: String,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  profilePic: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  saved: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  location: String,
});

export const User = mongoose.model("User", userschema);
