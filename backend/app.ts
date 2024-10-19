import express, { Request, Response } from "express";
import { connectDb } from "./src/config/connectDb";
import userRoute from "./src/router/user.route";
import profileRoute from "./src/router/Profile.route";
import cors from "cors"; // Import CORS package
import dotenv from "dotenv";
import authRoute from "./src/router/auth.route";
import fileUpload from "express-fileupload";
import Postroute from "./src/router/post.route";
import likeRoute from "./src/router/Like.route";

dotenv.config(); // Load environment variables from .env file

// Create an instance of the Express application
const app = express();

// Connect to the database
connectDb();

// Enable CORS for all origins
app.use(cors()); // Allow requests from any origin

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// Middleware to parse JSON requests
app.use(express.json());

// Set up routes
app.use("/api/v1/user", userRoute); // User routes
app.use("/api/v1/profile", profileRoute); // Profile routes
app.use("/api/v1/auth", authRoute); // Auth routes
app.use("/api/v1/post", Postroute); // Post routes
app.use("/api/v1/like", likeRoute); // Like routes

// Basic root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app; // Export the app instance
