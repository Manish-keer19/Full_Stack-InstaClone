import mongoose, { Schema } from "mongoose";

const commentShema = new Schema({
  comment: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  subcomment: [{ type: Schema.Types.ObjectId, ref: "Subcomment" }],
});

export const Comment = mongoose.model("Comment", commentShema);
