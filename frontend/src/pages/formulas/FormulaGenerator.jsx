import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import './FormulaGenerator.css'; // Import custom CSS for styling

const FormulaGenerator = () => {
  const [chapter, setChapter] = useState('');
  const [classLevel, setClassLevel] = useState('10th Grade'); // Default to 10th Grade
  const [competitiveLevel, setCompetitiveLevel] = useState('Olympiad'); // Default to Olympiad
  const [loading, setLoading] = useState(false);
  const [formulas, setFormulas] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateFormulas = async (e) => {
    e.preventDefault();

    setLoading(true);
    setFormulas(null);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/generate-formulas', {
        chapter,
        class_level: classLevel,
        competitive_level: competitiveLevel,
      });

      if (response.data.success) {
        setFormulas(response.data.formulas);
        toast.success('Formulas generated successfully!');
      } else {
        setError(response.data.message || 'Failed to generate formulas.');
        toast.error(response.data.message || 'Failed to generate formulas.');
      }
    } catch (err) {
      console.error('Error generating formulas:', err);
      setError(err.response?.data?.message || 'An unexpected error occurred.');
      toast.error(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-700 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Toaster />
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-3xl transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 formula-main-card">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-800 mb-6 sm:mb-8 text-center leading-tight">
          Generate Math Formulas <span className="block text-xl sm:text-2xl font-semibold text-blue-600">Using AI</span>
        </h2>

        {/* Formula Generation Form */}
        <form onSubmit={handleGenerateFormulas} className="space-y-5 mb-8 p-4 bg-gray-50 rounded-lg shadow-inner">
          <div>
            <label htmlFor="chapter" className="block text-sm font-medium text-gray-700 mb-1">
              Chapter:
            </label>
            <input
              type="text"
              id="chapter"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out transform hover:scale-102"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g., Quadratic Equations, Trigonometry"
              required
            />
          </div>

          <div>
            <label htmlFor="classLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Class/Grade Level:
            </label>
            <select
              id="classLevel"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out transform hover:scale-102"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
            >
              <option value="9th Grade">9th Grade</option>
              <option value="10th Grade">10th Grade</option>
              <option value="11th Grade">11th Grade</option>
              <option value="12th Grade">12th Grade</option>
            </select>
          </div>

          <div>
            <label htmlFor="competitiveLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Competitive Exam Level:
            </label>
            <select
              id="competitiveLevel"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out transform hover:scale-102"
              value={competitiveLevel}
              onChange={(e) => setCompetitiveLevel(e.target.value)}
            >
              <option value="Olympiad">Olympiad Level</option>
              <option value="JEE">JEE Level</option>
              <option value="Standard">Standard School Level</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-teal-700 text-white py-3 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center font-semibold text-lg transition duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-3 text-xl" />
            ) : (
              'Generate Formulas'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 shadow-md animate-fade-in">
            <p className="font-semibold text-lg mb-2">Error:</p>
            <p className="text-base">{error}</p>
          </div>
        )}

        {formulas && formulas.length > 0 && (
          <div className="mt-8 formula-display space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-4 text-center">Generated Formulas:</h3>
            {formulas.map((f, index) => (
              <div key={index} className="p-5 border border-gray-200 rounded-lg bg-white shadow-md formula-card animate-fade-in">
                <p className="font-bold text-lg text-gray-900 mb-2">{f.name}</p>
                <p className="font-mono text-xl text-indigo-700 bg-gray-100 p-3 rounded-md mb-2 overflow-x-auto">
                  {f.formula}
                </p>
                <p className="text-gray-700 text-base">{f.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormulaGenerator;
