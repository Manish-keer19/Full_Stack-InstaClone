import mongoose, { Schema } from "mongoose";

const commentShema = new Schema({
  comment: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  subcomment: [{ type: Schema.Types.ObjectId, ref: "Subcomment" }],
});

export const Comment = mongoose.model("Comment", commentShema);
