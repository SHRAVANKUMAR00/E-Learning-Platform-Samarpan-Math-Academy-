import express from "express";
import {
  forgotPassword,
  getPerformanceAnalysis,
  loginUser,
  myProfile,
  register,
  resetPassword,
  verifyUser,
  googleLogin, // NEW: Import googleLogin controller
} from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";
import { addProgress, getYourProgress } from "../controllers/course.js";

const router = express.Router();

// Auth and User Routes
router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuth, myProfile);

// Password Reset Routes
router.post("/user/forgot", forgotPassword);
router.post("/user/reset", resetPassword);

// Progress Routes
router.post("/user/progress", isAuth, addProgress);
router.get("/user/progress", isAuth, getYourProgress);

// AI Performance Analysis Route
router.get("/user/performance-analysis", isAuth, getPerformanceAnalysis);

// NEW: Google Login Route
router.post("/user/google-login", googleLogin); // Add this line

export default router;
