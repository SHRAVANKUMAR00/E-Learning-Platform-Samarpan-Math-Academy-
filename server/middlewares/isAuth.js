import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    // 1. Get token from request headers
    const token = req.headers.token;

    if (!token) {
      return res.status(403).json({
        message: "Please Login",
      });
    }

    // 2. SAFETY CHECK: Ensure the secret exists before verifying
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("FATAL ERROR: JWT_SECRET is missing in .env file");
        return res.status(500).json({ message: "Server Configuration Error" });
    }

    // 3. Verify the token using the secret from .env
    const decodedData = jwt.verify(token, jwtSecret);

    // 4. Find the user
    req.user = await User.findById(decodedData._id);

    if (!req.user) {
        return res.status(403).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(500).json({
      message: "Login First",
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not admin",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};