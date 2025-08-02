import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    // Get token from request headers
    const token = req.headers.token;

    // Check if token is provided
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized. Please log in.",
      });
    }

    // Verify the token
    // CORRECTED: Changed process.env.Jwt_Sec to process.env.JWT_SECRET
    const decodedData = jwt.verify(token, process.env.JWT_SECRET); 

    // Find the user from the database using the ID from the token
    req.user = await User.findById(decodedData._id);

    // If no user is found with that ID, it's an invalid token
    if (!req.user) {
        return res.status(401).json({
            message: "Invalid token. User not found.",
        });
    }

    // If everything is successful, proceed to the next middleware/controller
    next();
  } catch (error) {
    // This block will catch errors from jwt.verify (e.g., expired token)
    console.error("Authentication Error (isAuth):", error.message); // Added console.error for better debugging
    res.status(401).json({
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    // Check if the user object exists from the isAuth middleware
    if (!req.user) {
        return res.status(401).json({
            message: "Authentication required.",
        });
    }

    // Check if the user's role is 'admin'
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden. You do not have admin privileges.",
      });
    }

    // If user is an admin, proceed
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
