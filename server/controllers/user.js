import { User } from "../models/User.js";
import { QuizResult } from "../models/QuizResult.js"; // Needed for Analysis
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
import fetch from "node-fetch";
import { OAuth2Client } from 'google-auth-library'; 

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = TryCatch(async (req, res) => {
  const { email, name, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "User Already exists" });

  const hashPassword = await bcrypt.hash(password, 10);

  user = { name, email, password: hashPassword };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    { user, otp },
    process.env.Activation_Secret,
    { expiresIn: "5m" }
  );

  const data = { name, otp };

  await sendMail(email, "Samarpan Math Academy", data);

  res.status(200).json({ message: "Otp sent to your mail", activationToken });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify) return res.status(400).json({ message: "Otp Expired" });

  if (verify.otp !== Number(otp)) return res.status(400).json({ message: "Wrong Otp" });

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({ message: "User Registered" });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "No User with this email" });

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) return res.status(400).json({ message: "Wrong Password" });

  // FIXED: Using standard JWT_SECRET
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.json({ message: `Welcome back ${user.name}`, token, user });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "No User with this email" });

  const token = jwt.sign({ email }, process.env.Forgot_Secret);

  const data = { email, token };

  await sendForgotMail("Samarpan Math Academy", data);

  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
  await user.save();

  res.json({ message: "Reset Password Link sent to your mail" });
});

export const resetPassword = TryCatch(async (req, res) => {
  const decodedData = jwt.verify(req.query.token, process.env.Forgot_Secret);

  const user = await User.findOne({ email: decodedData.email });

  if (!user) return res.status(404).json({ message: "No user with this email" });

  if (user.resetPasswordExpire === null || user.resetPasswordExpire < Date.now()) {
    return res.status(400).json({ message: "Token Expired" });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  user.password = password;
  user.resetPasswordExpire = null;
  await user.save();

  res.json({ message: "Password Reset Successfully" });
});

// --- AI PERFORMANCE ANALYSIS ---
export const getPerformanceAnalysis = TryCatch(async (req, res) => {
  const userId = req.user._id;
  const quizResults = await QuizResult.find({ user: userId }).sort({ createdAt: 'asc' });

  if (!quizResults || quizResults.length === 0) {
    return res.status(200).json({
      success: true,
      analysis: {
        textReport: "No quiz data found. Please take a few quizzes to get your performance analysis.",
        chartData: null
      },
    });
  }

  const performanceData = quizResults.map(r => ({
    topic: r.topic,
    difficulty: r.difficulty,
    score: `${r.score}/${r.totalQuestions}`,
    percentage: (r.score / r.totalQuestions) * 100,
    date: r.createdAt.toDateString(),
  }));

  const prompt = `
    As an expert AI Math Tutor, analyze the following quiz performance data for a student.
    Provide the output as a single, minified JSON object with no markdown formatting.
    The JSON object must have two keys: "textReport" and "chartData".

    1. "textReport": A detailed performance analysis in markdown format.
    2. "chartData": An object containing data for charts.

    Here is the student's performance data:
    ${JSON.stringify(performanceData, null, 2)}
  `;

  const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
  const apiKey = process.env.GEMINI_API_KEY || "";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return res.status(500).json({ success: false, message: "AI Analysis Failed" });
  }

  const result = await response.json();
  const analysisJsonString = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (analysisJsonString) {
    try {
      const cleanedJsonString = analysisJsonString.replace(/```json\n|```/g, '').trim();
      const analysis = JSON.parse(cleanedJsonString);
      res.status(200).json({ success: true, analysis });
    } catch (parseError) {
      res.status(500).json({ success: false, message: "AI returned invalid JSON." });
    }
  } else {
    res.status(500).json({ success: false, message: "AI returned empty response." });
  }
});

// --- GOOGLE LOGIN (FIXED & STANDARDIZED) ---
export const googleLogin = TryCatch(async (req, res) => {
  // Google button sends 'credential', simpler requests might send 'token'
  const token = req.body.credential || req.body.token;

  if (!token) {
    return res.status(400).json({ success: false, message: "Google Token Required" });
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, name, picture } = ticket.getPayload();

  let user = await User.findOne({ email });

  if (!user) {
    // Generate a secure random password for Google users
    const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(randomPassword, 10);

    user = await User.create({
      name,
      email,
      password: hashPassword,
      // avatar: picture, // Uncomment if you have an 'avatar' field in your Schema
      role: "user",
    });
  }

  const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Return consistent structure matches loginUser
  res.status(200).json({
    message: `Welcome back ${user.name}`,
    token: authToken,
    user,
  });
});