import { Router } from "express";
import { getAllMessages } from "../controllers/message.controller";

const messageRoute = Router();

messageRoute.post("/getAllMessages", getAllMessages);

export default messageRoute