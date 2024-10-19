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
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  saved: [{ type: Schema.Types.ObjectId, ref: "User" }],
  location: String,
});

export const User = mongoose.model("User", userschema);
