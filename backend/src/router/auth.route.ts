import { Router } from "express";
import { generateOtp, Signup } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.post("/signup", Signup);
authRoute.post("/generateOtp", generateOtp);

export default authRoute;
