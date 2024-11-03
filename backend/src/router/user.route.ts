import { RequestHandler, Router } from "express";
import {
  fetchUserFeed,
  fetchUserFollowingList,
  FollowUser,
  getuserFulldata,
  searchUsers,
  UnFollowUser,
} from "../controllers/User.controller";
import { authentication } from "../middleware/authantication";

const userRoute = Router();

// Basic GET route
userRoute.get("/", (req, res) => {
  res.send("Hello World!");
});

userRoute.post("/getuserFulldata", getuserFulldata);
userRoute.post("/followuser", authentication, FollowUser);
userRoute.post("/unFollowUser", authentication, UnFollowUser);
userRoute.post("/searchUsers", authentication, searchUsers);
userRoute.post("/fetchUserFeed", authentication, fetchUserFeed);
userRoute.post("/fetchUserFollowingList", authentication, fetchUserFollowingList as unknown as RequestHandler) 
export default userRoute;
