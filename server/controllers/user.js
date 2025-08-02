import { User } from "../models/User.js";
import { QuizResult } from "../models/QuizResult.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
import fetch from "node-fetch";
import { OAuth2Client } from 'google-auth-library'; // NEW: Import OAuth2Client

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// All other functions (register, login, etc.) remain the same...
export const register = TryCatch(async (req, res) => {
  const { email, name, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "User Already exists" });
  const hashPassword = await bcrypt.hash(password, 10);
  user = { name, email, password: hashPassword };
  const otp = Math.floor(Math.random() * 1000000);
  const activationToken = jwt.sign({ user, otp }, process.env.Activation_Secret, { expiresIn: "5m" });
  const data = { name, otp };
  await sendMail(email, "Samarpan Math Academy", data);
  res.status(200).json({ message: "Otp send to your mail", activationToken });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  const verify = jwt.verify(activationToken, process.env.Activation_Secret);
  if (!verify) return res.status(400).json({ message: "Otp Expired" });
  if (verify.otp !== otp) return res.status(400).json({ message: "Wrong Otp" });
  await User.create({ name: verify.user.name, email: verify.user.email, password: verify.user.password });
  res.json({ message: "User Registered" });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "No User with this email" });
  const mathPassword = await bcrypt.compare(password, user.password);
  if (!mathPassword) return res.status(400).json({ message: "wrong Password" });
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "15d" }); // Use JWT_SECRET
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
  res.json({ message: "Reset Password Link is send to you mail" });
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
  res.json({ message: "Password Reset" });
});


// --- UPDATED AI PERFORMANCE ANALYSIS FUNCTION ---
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

    1.  "textReport": A detailed performance analysis in markdown format. This report should include:
        - **Overall Summary:** A brief overview of the student's performance.
        - **Strengths:** Specific topics where the student performs well.
        - **Areas for Improvement:** Specific topics where the student is struggling.
        - **Actionable Study Plan:** A clear, step-by-step study plan.

    2.  "chartData": An object containing data for charts. It should have two keys:
        - "topicPerformance": An array of objects, where each object represents a unique topic and its average score percentage. Example: [{ "topic": "Algebra", "averageScore": 85 }, { "topic": "Calculus", "averageScore": 55 }]
        - "overallStats": An array of two objects for a pie chart, showing the total number of correct and incorrect answers across all quizzes. Example: [{ "name": "Correct", "value": 45 }, { "name": "Incorrect", "value": 15 }]

    Here is the student's performance data:
    ${JSON.stringify(performanceData, null, 2)}
  `;

  const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
  const payload = { contents: chatHistory };
  const apiKey = process.env.GEMINI_API_KEY || "";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return res.status(500).json({ success: false, message: "Failed to get analysis from AI model." });
    }

    const result = await response.json();

    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
      const analysisJsonString = result.candidates[0].content.parts[0].text;
      try {
        const cleanedJsonString = analysisJsonString.replace(/```json\n|```/g, '').trim();
        const analysis = JSON.parse(cleanedJsonString);
        res.status(200).json({ success: true, analysis });
      } catch (parseError) {
        res.status(500).json({ success: false, message: "AI model returned unparseable JSON." });
      }
    } else {
      res.status(500).json({ success: false, message: "AI model returned an unexpected response structure." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error during AI analysis." });
  }
});

// NEW: Google Login Controller Function
export const googleLogin = TryCatch(async (req, res) => {
  const { token } = req.body; // This is the Google ID token from the frontend

  if (!token) {
    return res.status(400).json({ success: false, message: "Google token is required." });
  }

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
    });

    const payload = ticket.getPayload(); // Get user data from the token
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (user) {
      // User exists, log them in
      const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ success: true, message: `Welcome back, ${user.name}!`, token: authToken });
    } else {
      // User does not exist, register them
      // You might want to generate a dummy password or prompt them to set one later
      const dummyPassword = await bcrypt.hash(email + Date.now(), 10); // Hash a unique dummy password

      user = await User.create({
        name: name,
        email: email,
        password: dummyPassword, // Store a dummy hashed password
        avatar: picture, // Store Google profile picture
        role: "user", // Default role
        verified: true, // Google accounts are considered verified
      });

      const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ success: true, message: `Welcome, ${user.name}! Account created.`, token: authToken });
    }

  } catch (error) {
    console.error("Google login backend error:", error);
    res.status(500).json({ success: false, message: "Internal server error during Google login.", error: error.message });
  }
});
