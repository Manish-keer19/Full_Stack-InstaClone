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
});

export const User = mongoose.model("User", userschema);
