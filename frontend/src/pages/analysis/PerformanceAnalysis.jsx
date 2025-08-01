import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { FaBrain, FaSpinner, FaLightbulb } from 'react-icons/fa';
import { server } from '../../main';
import './AITools.css';

// A simple component to render markdown-like text
const MarkdownRenderer = ({ text }) => {
    // Basic rendering: split by newlines and handle simple markdown
    const lines = text.split('\n').map((line, index) => {
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-bold text-purple-700 mt-4 mb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold text-purple-800 mt-6 mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('**')) {
            return <p key={index} className="my-1"><strong>{line.replace(/\*\*/g, '')}</strong></p>;
        }
        if (line.startsWith('* ')) {
            return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
        }
        return <p key={index} className="my-1">{line}</p>;
    });

    return <div className="text-gray-800 text-left">{lines}</div>;
};


const PerformanceAnalysis = () => {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysisRequest = async () => {
    setLoading(true);
    setError(null);
    setAnalysis('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in to get an analysis.');
        setLoading(false);
        return;
      }

      const { data } = await axios.get(`${server}/api/user/performance-analysis`, {
        headers: {
          token: token,
        },
      });

      if (data.success) {
        setAnalysis(data.analysis);
        toast.success('Analysis complete!');
      } else {
        setError(data.message || 'Failed to fetch analysis.');
        toast.error(data.message || 'Failed to fetch analysis.');
      }
    } catch (err) {
      console.error("Error fetching analysis:", err);
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Toaster position="top-center" />
      <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 text-center">
          AI Performance Analyst
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Click the button below to get a detailed analysis of your quiz performance and a personalized study plan.
        </p>

        <div className="text-center mb-8">
          <button
            onClick={handleAnalysisRequest}
            disabled={loading}
            className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-3" />
                Analyzing...
              </>
            ) : (
              <>
                <FaBrain className="mr-3" />
                Analyze My Performance
              </>
            )}
          </button>
        </div>

        {analysis && (
          <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200 shadow-lg animate-fade-in">
             <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-3 text-yellow-500" /> Your Personalized Report
            </h3>
            <MarkdownRenderer text={analysis} />
          </div>
        )}

        {error && (
            <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                <p>Error: {error}</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default PerformanceAnalysis;
