import { Router } from "express";
import { editProfile } from "../controllers/profile.controller";
import exp from "constants";

const profileRoute = Router();

profileRoute.post("/editProfile", editProfile);

export default profileRoute;
