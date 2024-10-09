import express, { Request, Response } from "express";
import { connectDb } from "./src/config/connectDb";
import userRoute from "./src/router/user.route";
import cors from "cors"; // Import CORS package
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 3000; // Set the port, default to 3000
const app = express(); // Create an instance of the Express application

// Connect to the database
connectDb();

// Enable CORS for all origins
// const corsOptions = {
//   origin: '*', // Allow all origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// };

// app.use(cors(corsOptions));

app.use(cors()); // This allows requests from any origin

// Middleware to parse JSON requests
app.use(express.json());

// Set up routes
app.use("/api/v1/user", userRoute); // User routes

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
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
