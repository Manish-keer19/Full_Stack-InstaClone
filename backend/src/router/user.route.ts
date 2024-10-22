import { Router } from "express";
import { getuserFulldata } from "../controllers/User.controller";

const userRoute = Router();

// Basic GET route
userRoute.get("/", (req, res) => {
  res.send("Hello World!");
});

userRoute.post("/getuserFulldata", getuserFulldata);
export default userRoute;
