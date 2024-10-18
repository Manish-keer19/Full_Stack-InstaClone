import mongoose, { Schema } from "mongoose";

const LikesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

export const Like= mongoose.model("Likes", LikesSchema);
