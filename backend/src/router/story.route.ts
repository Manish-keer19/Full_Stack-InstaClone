// import { Router } from "express";
// import { authentication } from "../middleware/authantication";
// import { createStory } from "../controllers/Story.Controller";

// const storyRoute = Router();

// storyRoute.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// storyRoute.post("/createStory", authentication, createStory);

// export default storyRoute;

import { RequestHandler, Router } from "express";
import { authentication } from "../middleware/authantication"; // Ensure your authentication middleware adds 'user'
import { createStory, getStory } from "../controllers/Story.Controller";

const storyRoute = Router();

storyRoute.post(
  "/createStory",
  authentication,
  createStory as unknown as RequestHandler
);
storyRoute.get("/getStory/:id", getStory);

export default storyRoute;
