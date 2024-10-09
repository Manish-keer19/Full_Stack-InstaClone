import { Router } from "express";
import {
  createUser,
  editProfile,
  getuserdata,
} from "../controllers/User.controller";

const userRoute = Router();

// Basic GET route
userRoute.get("/", (req, res) => {
  res.send("Hello World!");
});

// POST route to create a user
userRoute.post("/CreateUser", createUser);
userRoute.post("/editProfile", editProfile);
userRoute.post("/getuserdata", getuserdata);
export default userRoute;
