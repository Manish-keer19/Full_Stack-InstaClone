import { Router } from "express";
import { authentication } from "../middleware/authantication";
import { createPost } from "../controllers/Post.controller";

const Postroute = Router();

Postroute.post("/createpost", authentication, createPost);

export default Postroute;
