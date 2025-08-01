import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Link to the User model
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['9th_10th_Olympiad', '11th_12th_JEE', 'medium', 'easy', 'hard', 'Standard'], // Ensure this matches your frontend/backend difficulty levels
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    // You could add more details here, e.g., an array of { question, selectedAnswer, correctAnswer }
    // answers: [
    //   {
    //     question: String,
    //     selectedAnswer: String,
    //     correctAnswer: String,
    //     isCorrect: Boolean,
    //   },
    // ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const QuizResult = mongoose.model('QuizResult', quizResultSchema);
