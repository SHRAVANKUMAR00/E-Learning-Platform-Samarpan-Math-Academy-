    import express from "express";
    import dotenv from "dotenv";
    import { connectDb } from "./database/db.js";
    import Razorpay from "razorpay";
    import cors from "cors";
    import fetch from "node-fetch";
    import mongoose from "mongoose";
    import { QuizResult } from "./models/QuizResult.js";
    import { User } from "./models/User.js";

    dotenv.config();

    export const instance = new Razorpay({
      key_id: process.env.Razorpay_Key,
      key_secret: process.env.Razorpay_Secret,
    });

    const app = express();

    app.use(express.json());

    // NEW: Explicit CORS configuration for Vercel & Render deployment
    const allowedOrigins = [
      "http://localhost:5173", // For local development
      process.env.frontendurl, // Your deployed Vercel frontend URL (will be set in Render env vars)
      "https://samarpan-guzg.onrender.com", // REPLACE WITH ACTUAL RENDER URL
      // Add any other specific origins if you have them
    ];

    app.use(cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }));

    const port = process.env.PORT;

    app.get("/", (req, res) => {
      res.send("Server is working");
    });

    app.use("/uploads", express.static("uploads"));

    import userRoutes from "./routes/user.js";
    import courseRoutes from "./routes/course.js";
    import adminRoutes from "./routes/admin.js";

    app.use("/api", userRoutes);
    app.use("/api", courseRoutes);
    app.use("/api", adminRoutes);

    app.post("/api/generate-quiz", async (req, res) => {
      const { topic, difficulty, num_questions = 10 } = req.body;
      if (!topic) {
        return res.status(400).json({ success: false, message: "Quiz topic is required." });
      }
      let difficulty_prompt_text = '';
      switch (difficulty) {
        case '9th_10th_Olympiad':
          difficulty_prompt_text = '9th and 10th grade Olympiad level';
          break;
        case '11th_12th_JEE':
          difficulty_prompt_text = '11th and 12th grade JEE Mains/Advanced level';
          break;
          default:
          difficulty_prompt_text = 'medium school level';
      }
      const prompt = `Generate a ${num_questions}-question multiple-choice quiz on the topic of "${topic}".
      The questions should be suitable for a ${difficulty_prompt_text} mathematics student.
      Each question should have 4 options (A, B, C, D) and clearly indicate the correct answer.
      Format the output as a JSON array of objects, where each object represents a question.
      Each question object should have the following properties:
      - "question": The quiz question text.
      - "options": An array of strings for the answer options (e.g., ["A) 3", "B) 4", "C) 5", "D) 6"]).
      - "correct_answer": The letter of the correct option (e.g., "A", "B", "C", "D").
      Example JSON format for one question:
      {
        "question": "What is 2 + 2?",
        "options": ["A) 3", "B) 4", "C) 5", "D) 6"],
        "correct_answer": "B"
      }
      `;
      const chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
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
          const errorData = await response.json();
          console.error("Gemini API Error Response:", errorData);
          return res.status(response.status).json({
            success: false,
            message: "Failed to generate quiz from AI model.",
            details: errorData,
          });
        }
        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const quizJsonString = result.candidates[0].content.parts[0].text;
          try {
            const cleanedJsonString = quizJsonString.replace(/```json\n|```/g, '').trim();
            const quiz = JSON.parse(cleanedJsonString);
            res.status(200).json({ success: true, quiz });
          } catch (parseError) {
            console.error("Failed to parse AI response as JSON:", parseError);
            console.error("Raw AI response:", quizJsonString);
            res.status(500).json({ success: false, message: "AI model returned unparseable JSON.", rawResponse: quizJsonString });
          }
        } else {
          console.error("Unexpected Gemini API response structure:", result);
          res.status(500).json({ success: false, message: "AI model returned an unexpected response." });
        }
      } catch (error) {
        console.error("Error calling Gemini API for quiz generation:", error);
        res.status(500).json({ success: false, message: "Internal server error during AI quiz generation.", error: error.message });
      }
    });

    app.post("/api/generate-formulas", async (req, res) => {
      const { chapter, class_level, competitive_level } = req.body;
      if (!chapter || !class_level || !competitive_level) {
        return res.status(400).json({ success: false, message: "Chapter, Class Level, and Competitive Level are required." });
      }
      let competitive_context_text = '';
      switch (competitive_level) {
        case 'Olympiad':
        competitive_context_text = 'Olympiad level';
        break;
        case 'JEE':
        competitive_context_text = 'JEE Mains and Advanced level';
        break;
        default:
        competitive_context_text = 'standard school level';
      }
      const prompt = `Generate a comprehensive list of mathematical formulas for the "${chapter}" chapter, suitable for a "${class_level}" student preparing for "${competitive_context_text}" examinations.
      For each formula, provide the formula itself and a very brief description of what it represents or is used for.
      Organize the formulas logically (e.g., by sub-topic if applicable).
      Format the output as a JSON object with a single key "formulas" which is an array of objects.
      Each formula object should have "name" (e.g., "Quadratic Formula"), "formula" (the actual formula, ideally in LaTeX format if possible, otherwise plain text), and "description".
      Example JSON format for one formula:
      {
        "formulas": [
          {
            "name": "Pythagorean Theorem",
            "formula": "a^2 + b^2 = c^2",
            "description": "Relates the sides of a right-angled triangle."
          }
        ]
      }
      `;
      const chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
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
          const errorData = await response.json();
          console.error("Gemini API Error Response for Formula Generation:", errorData);
          return res.status(response.status).json({
            success: false,
            message: "Failed to generate formulas from AI model.",
            details: errorData,
          });
        }
        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const formulasJsonString = result.candidates[0].content.parts[0].text;
          try {
            const cleanedJsonString = formulasJsonString.replace(/```json\n|```/g, '').trim();
            const formulas = JSON.parse(cleanedJsonString);
            res.status(200).json({ success: true, formulas: formulas.formulas });
          } catch (parseError) {
            console.error("Failed to parse AI response as JSON for formulas:", parseError);
            console.error("Raw AI response for formulas:", formulasJsonString);
            res.status(500).json({ success: false, message: "AI model returned unparseable JSON for formulas.", rawResponse: formulasJsonString });
          }
        } else {
          console.error("Unexpected Gemini API response structure for formulas:", result);
          res.status(500).json({ success: false, message: "AI model returned an unexpected response." });
        }
      } catch (error) {
        console.error("Error calling Gemini API for formula generation:", error);
        res.status(500).json({ success: false, message: "Internal server error during AI formula generation.", error: error.message });
      }
    });

    app.post("/api/submit-quiz-result", async (req, res) => {
      const { userId, topic, difficulty, score, totalQuestions } = req.body;
      if (!userId || !topic || !difficulty || score === undefined || totalQuestions === undefined) {
        return res.status(400).json({ success: false, message: "Missing required quiz result data." });
      }
      try {
        const userExists = await User.findById(userId);
        if (!userExists) {
          return res.status(404).json({ success: false, message: "User not found." });
        }
        const newQuizResult = new QuizResult({
          user: userId,
          topic,
          difficulty,
          score,
          totalQuestions,
        });
        await newQuizResult.save();
        res.status(201).json({ success: true, message: "Quiz result saved successfully!", result: newQuizResult });
      } catch (error) {
        console.error("Error saving quiz result:", error);
        res.status(500).json({ success: false, message: "Internal server error while saving quiz result.", error: error.message });
      }
    });

    app.get("/api/get-recommendations/:userId", async (req, res) => {
      const { userId } = req.params;
      try {
        const recentResults = await QuizResult.find({ user: userId })
          .sort({ createdAt: -1 })
          .limit(5);
        let recommendation = "Keep up the great work! Explore our latest courses.";
        if (recentResults.length > 0) {
          const lastQuiz = recentResults[0];
          const percentage = (lastQuiz.score / lastQuiz.totalQuestions) * 100;
          if (percentage < 60) {
            recommendation = `You scored ${lastQuiz.score}/${lastQuiz.totalQuestions} on ${lastQuiz.topic} (${lastQuiz.difficulty}). Consider reviewing "${lastQuiz.topic}" or related foundational concepts.`;
          } else if (percentage >= 80) {
            recommendation = `Excellent work on ${lastQuiz.topic} (${lastQuiz.difficulty})! You scored ${lastQuiz.score}/${lastQuiz.totalQuestions}. You might be ready for more advanced topics in "${lastQuiz.topic}" or a higher difficulty level.`;
          } else {
            recommendation = `Good progress on ${lastQuiz.topic} (${lastQuiz.difficulty}). Keep practicing!`;
          }
        }
        res.status(200).json({ success: true, recommendation });
      } catch (error) {
        console.error("Error getting recommendations:", error);
        res.status(500).json({ success: false, message: "Internal server error while fetching recommendations.", error: error.message });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      connectDb();
    });
    