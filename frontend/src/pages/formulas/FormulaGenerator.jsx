import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { server } from '../../main'; // NEW: Import server URL
import { UserData } from '../../context/UserContext'; // NEW: Import UserData context

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('9th_10th_Olympiad');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const { user } = UserData(); // Get user from context

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();

    setLoading(true);
    setQuiz(null);
    setError(null);
    setStudentAnswers({});
    setShowResults(false);

    try {
      // CORRECTED: Use 'server' constant for API call
      const response = await axios.post(`${server}/api/generate-quiz`, {
        topic,
        difficulty,
        num_questions: 10,
      });

      if (response.data.success) {
        setQuiz(response.data.quiz);
        toast.success('Quiz generated successfully! Now, select your answers.');
      } else {
        setError(response.data.message || 'Failed to generate quiz.');
        toast.error(response.data.message || 'Failed to generate quiz.');
      }
    } catch (err) {
      console.error('Error generating quiz:', err);
      setError(err.response?.data?.message || 'An unexpected error occurred.');
      toast.error(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setStudentAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: selectedOption
    }));
  };

  // Modified handleSubmitQuiz to send results to backend
  const handleSubmitQuiz = async () => {
    // Check if all questions are answered before submitting
    if (Object.keys(studentAnswers).length !== quiz.length) {
      toast.error('Please answer all questions before submitting.');
      return;
    }

    setShowResults(true); // Show results immediately in frontend

    const score = calculateScore();
    const totalQuestions = quiz.length;

    // CORRECTED: Get userId dynamically from context
    const userId = user?._id; 

    if (!userId) {
      toast.error("Could not find user. Please ensure you're logged in to save results.");
      return;
    }

    try {
      // CORRECTED: Use 'server' constant for API call
      const response = await axios.post(`${server}/api/submit-quiz-result`, {
        userId, // Send user ID
        topic: quiz[0].topic || topic, // Use topic from quiz if available, else from state
        difficulty: quiz[0].difficulty || difficulty, // Use difficulty from quiz if available, else from state
        score,
        totalQuestions,
      });

      if (response.data.success) {
        toast.success('Quiz submitted and results saved!');
        console.log('Quiz result saved:', response.data.result);
      } else {
        toast.error(response.data.message || 'Failed to save quiz results.');
        console.error('Failed to save quiz results:', response.data.details);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving quiz results.');
      console.error('Error submitting quiz results:', err);
    }
  };

  // Calculate score (remains the same)
  const calculateScore = () => {
    if (!quiz) return 0;
    let score = 0;
    quiz.forEach((q, index) => {
      if (studentAnswers[index] === q.correct_answer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-inner w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Generate Math Quiz (10 Questions)</h2>

      <form onSubmit={handleGenerateQuiz} className="space-y-4 mb-8">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Topic:
          </label>
          <input
            type="text"
            id="topic"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Algebra, Geometry, Calculus"
            required
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level:
          </label>
          <select
            id="difficulty"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="9th_10th_Olympiad">9th/10th Grade Olympiad Level</option>
            <option value="11th_12th_JEE">11th/12th Grade JEE Level</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            'Generate Quiz (10 Questions)'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {quiz && quiz.length > 0 && (
        <div className="mt-8 quiz-display">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Quiz:</h3>
          {quiz.map((q, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50 question-card">
              <p className="font-bold text-lg text-gray-900 mb-2">Q{qIndex + 1}: {q.question}</p>
              <div className="options-group">
                {q.options.map((option, optIndex) => (
                  <label key={optIndex} className="block text-gray-700 mb-1 option-label">
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={option.charAt(0)}
                      onChange={() => handleAnswerChange(qIndex, option.charAt(0))}
                      checked={studentAnswers[qIndex] === option.charAt(0)}
                      className="mr-2"
                      disabled={showResults}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {showResults && (
                <div className="mt-2 text-sm">
                  <p className={`font-semibold ${studentAnswers[qIndex] === q.correct_answer ? 'text-green-600' : 'text-red-600'}`}>
                    Your Answer: {studentAnswers[qIndex] || 'Not answered'}
                  </p>
                  <p className="text-green-600">
                    Correct Answer: {q.correct_answer}
                  </p>
                </div>
              )}
            </div>
          ))}
          {!showResults && (
            <button
              onClick={handleSubmitQuiz}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-6 submit-quiz-button"
              disabled={!quiz || Object.keys(studentAnswers).length !== quiz.length}
            >
              Submit Quiz
            </button>
          )}
          {showResults && (
            <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-md text-center final-score">
              <h3 className="text-xl font-bold">Your Score: {calculateScore()} / {quiz.length}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
