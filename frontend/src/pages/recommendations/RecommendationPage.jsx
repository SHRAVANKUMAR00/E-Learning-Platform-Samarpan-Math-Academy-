import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { FaSpinner, FaLightbulb } from 'react-icons/fa'; // Icons for features
import './AITools.css'; // Import custom CSS file

const RecommendationPage = () => {
  const [recommendation, setRecommendation] = useState('');
  const [loadingRecommendation, setLoadingRecommendation] = useState(true);
  const [errorRecommendation, setErrorRecommendation] = useState(null);

  // Placeholder User ID - In a real app, this would come from your authentication context
  // For testing, use the same userId you used in QuizGenerator.jsx for submitting results
  const userId = "60c72b1f9b1e8b001c8e8e8e"; // REPLACE WITH ACTUAL USER ID OR DYNAMICALLY FETCH

  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoadingRecommendation(true);
      setErrorRecommendation(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/get-recommendations/${userId}`);
        if (response.data.success) {
          setRecommendation(response.data.recommendation);
        } else {
          setErrorRecommendation(response.data.message || 'Failed to fetch recommendations.');
          toast.error(response.data.message || 'Failed to fetch recommendations.');
        }
      } catch (err) {
        console.error("Error fetching recommendation:", err);
        setErrorRecommendation(err.response?.data?.message || 'An unexpected error occurred while fetching recommendations.');
        toast.error(err.response?.data?.message || 'An unexpected error occurred while fetching recommendations.');
      } finally {
        setLoadingRecommendation(false);
      }
    };

    if (userId) { // Only fetch if userId is available
      fetchRecommendation();
    } else {
      setRecommendation("Please log in to get personalized recommendations.");
      setLoadingRecommendation(false);
    }
  }, [userId]); // Re-fetch if userId changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <Toaster />
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-3xl transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 recommendation-main-card">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-6 sm:mb-8 text-center leading-tight">
          Personalized Learning Recommendations
        </h2>

        {/* Personalized Recommendation Display */}
        <div className="p-5 bg-blue-50 rounded-lg border border-blue-200 shadow-md animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 flex items-center">
            <FaLightbulb className="mr-3 text-blue-500" /> Your Recommendation:
          </h3>
          {loadingRecommendation ? (
            <p className="text-blue-600 flex items-center">
              <FaSpinner className="animate-spin mr-2" /> Loading recommendations...
            </p>
          ) : errorRecommendation ? (
            <p className="text-red-600">Error: {errorRecommendation}</p>
          ) : (
            <p className="text-gray-800 text-lg">{recommendation}</p>
          )}
        </div>

        {/* Optional: Add links to other AI features here later if desired */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Explore other AI tools:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/generate-quiz" className="text-indigo-600 hover:text-indigo-800 font-semibold">Quiz Generator</Link>
            <Link to="/generate-formulas" className="text-teal-600 hover:text-teal-800 font-semibold">Formula Generator</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
