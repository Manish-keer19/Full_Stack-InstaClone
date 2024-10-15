import { Router } from "express";
import { generateOtp, Signup, Login } from "../controllers/auth.controller";
const authRoute = Router();

authRoute.post("/signup", Signup);
authRoute.post("/generateOtp", generateOtp);
authRoute.post("/login", Login);

export default authRoute;
