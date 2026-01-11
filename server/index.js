import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "razorpay";
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"; 
import { QuizResult } from "./models/QuizResult.js";
import { User } from "./models/User.js";

// --- Import Routes ---
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();
app.use(express.json());

// --- CORS & Security ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.frontendurl,
  "https://samarpan-guzg.onrender.com"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use("/uploads", express.static("uploads"));

// ==========================================
//  HELPER: AUTO-DETECT BEST MODEL
// ==========================================
async function getBestModel(apiKey) {
  try {
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResponse = await fetch(listUrl);
    const data = await listResponse.json();

    if (!data.models) return "gemini-flash-latest"; 

    const availableModels = data.models
      .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
      .map(m => m.name.replace("models/", ""));

    const preferences = [
      "gemini-1.5-flash",
      "gemini-1.5-flash-latest",
      "gemini-flash-latest",
      "gemini-pro",
      "gemini-exp-1206"
    ];

    for (const pref of preferences) {
      if (availableModels.includes(pref)) return pref;
    }
    return availableModels[0] || "gemini-flash-latest"; 

  } catch (error) {
    console.error("Model Detect Error:", error.message);
    return "gemini-flash-latest";
  }
}

// ==========================================
//  AI ROUTES
// ==========================================

// --- QUIZ GENERATION ---
app.post("/api/generate-quiz", async (req, res) => {
  const { topic, difficulty, num_questions = 10 } = req.body;
  if (!topic) return res.status(400).json({ success: false, message: "Quiz topic is required." });

  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = await getBestModel(apiKey);
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  let difficulty_text = 'medium school level';
  if (difficulty === '9th_10th_Olympiad') difficulty_text = '9th and 10th grade Olympiad level';
  if (difficulty === '11th_12th_JEE') difficulty_text = '11th and 12th grade JEE Mains/Advanced level';

  const prompt = `Generate a ${num_questions}-question multiple-choice quiz on "${topic}".
  Level: ${difficulty_text}.
  Return ONLY valid JSON.
  Format: JSON array of objects.
  Properties: "question", "options" (array of 4 strings), "correct_answer" (A/B/C/D).
  Example: [{"question": "Q1", "options": ["A) 1", "B) 2", "C) 3", "D) 4"], "correct_answer": "A"}]`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ success: false, message: "AI Error", details: errorData });
    }

    const result = await response.json();
    if (!result.candidates || result.candidates.length === 0) return res.status(500).json({ success: false, message: "AI Empty Response" });

    const text = result.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\[[\s\S]*\]/); 
    const jsonString = jsonMatch ? jsonMatch[0] : text;

    try {
        const quiz = JSON.parse(jsonString);
        res.status(200).json({ success: true, quiz });
    } catch (e) {
        res.status(500).json({ success: false, message: "Failed to parse AI response" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// --- FORMULA GENERATION ---
app.post("/api/generate-formulas", async (req, res) => {
  const { chapter, class_level, competitive_level } = req.body;
  if (!chapter) return res.status(400).json({ success: false, message: "Chapter is required." });

  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = await getBestModel(apiKey);
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const prompt = `Generate math formulas for "${chapter}" (${class_level}, ${competitive_level}).
  Return ONLY valid JSON.
  Format: JSON object with key "formulas" containing an array of objects.
  Properties: "name", "formula" (LaTeX preferred, wrap in $$), "description".`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
    });

    if (!response.ok) return res.status(response.status).json({ success: false, message: "AI Error" });
    
    const result = await response.json();
    if (!result.candidates || result.candidates.length === 0) return res.status(500).json({ success: false, message: "AI Empty" });

    const text = result.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/); 
    const jsonString = jsonMatch ? jsonMatch[0] : text;

    try {
        const parsedData = JSON.parse(jsonString);
        const formulas = Array.isArray(parsedData) ? parsedData : parsedData.formulas;
        res.status(200).json({ success: true, formulas });
    } catch (e) {
        res.status(500).json({ success: false, message: "Failed to parse AI response" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// --- SUBMIT RESULTS ---
app.post("/api/submit-quiz-result", async (req, res) => {
  const { userId, topic, difficulty, score, totalQuestions } = req.body;
  if (!userId || !topic || !difficulty) return res.status(400).json({ success: false, message: "Missing Data" });

  try {
    const newQuizResult = new QuizResult({ user: userId, topic, difficulty, score, totalQuestions });
    await newQuizResult.save();
    res.status(201).json({ success: true, message: "Saved" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving result" });
  }
});

// --- PERFORMANCE ANALYSIS (FIXED) ---
app.get("/api/user/performance-analysis", async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ success: false, message: "No Token" });

        // --- FIX: Using JWT_SECRET to match your .env ---
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
             console.error("FATAL ERROR: JWT_SECRET is missing in .env");
             return res.status(500).json({ success: false, message: "Server Config Error" });
        }

        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded._id;

        // Fetch User Data
        const results = await QuizResult.find({ user: userId });
        
        if (results.length === 0) {
            return res.json({ 
                success: true, 
                analysis: { 
                    textReport: "No quiz data available yet. Take a quiz to get an analysis!", 
                    chartData: { topicPerformance: [] } 
                }
            });
        }

        // Prepare Data for AI
        const topicStats = {};
        results.forEach(r => {
            if (!topicStats[r.topic]) topicStats[r.topic] = { total: 0, score: 0, count: 0 };
            topicStats[r.topic].total += r.totalQuestions;
            topicStats[r.topic].score += r.score;
            topicStats[r.topic].count += 1;
        });

        const topicPerformance = Object.keys(topicStats).map(topic => ({
            topic,
            averageScore: Math.round((topicStats[topic].score / topicStats[topic].total) * 100)
        }));

        // Call AI for Text Report
        const apiKey = process.env.GEMINI_API_KEY;
        const modelName = await getBestModel(apiKey);
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const prompt = `Analyze this student's math performance based on these topic scores (percentage):
        ${JSON.stringify(topicPerformance)}
        
        Provide a short, encouraging report (max 100 words) using Markdown formatting.
        Highlight strengths and suggest 1 area for improvement.`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
        });

        let textReport = "Keep practicing to see your AI analysis!";
        if (response.ok) {
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0) {
                textReport = result.candidates[0].content.parts[0].text;
            }
        }

        res.json({
            success: true,
            analysis: {
                chartData: { topicPerformance },
                textReport
            }
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ success: false, message: "Analysis Failed" });
    }
});

// --- GET RECOMMENDATIONS ---
app.get("/api/get-recommendations/:userId", async (req, res) => {
  try {
    const recentResults = await QuizResult.find({ user: req.params.userId }).sort({ createdAt: -1 }).limit(5);
    let recommendation = "Keep practicing!";
    if (recentResults.length > 0) {
      const last = recentResults[0];
      const pct = (last.score / last.totalQuestions) * 100;
      if (pct < 60) recommendation = `Review basics of ${last.topic}.`;
      else if (pct >= 80) recommendation = `Great job on ${last.topic}! Try advanced problems.`;
      else recommendation = `Good progress on ${last.topic}.`;
    }
    res.status(200).json({ success: true, recommendation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

// --- EXISTING ROUTES ---
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is working");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});