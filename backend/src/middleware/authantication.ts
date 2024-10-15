import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include a user property
interface CustomRequest extends Request {
  user?: JwtPayload; // Optional user property
}

// Authentication middleware
export const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Fetch the token from the body or Authorization header
    const token =
      req.body.token || req.header("Authorization")?.replace("Bearer ", "");

    // If token is missing, return a response
    if (!token) {
      res.status(400).json({
        success: false,
        message: "Token not found",
      });
      return; // Exit the middleware
    }

    // Verify the token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT secret is not defined");
    }

    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Attach the payload to the request object
    req.user = payload;

    // Proceed to the next middleware only after successful verification
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while verifying the token",
      error: (error as Error).message,
    });
    return; // Exit the middleware
  }
};
