import { Router } from "express";
import { generateOtp, Signup, Login, IsUsernameAlreadyTaken } from "../controllers/auth.controller";
const authRoute = Router();

authRoute.post("/signup", Signup);
authRoute.post("/generateOtp", generateOtp);
authRoute.post("/login", Login);
authRoute.post("/isUsernameAlreadyTaken",IsUsernameAlreadyTaken );

export default authRoute;
