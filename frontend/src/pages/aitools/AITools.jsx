import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FaLightbulb, FaCalculator, FaChartLine, FaQuestionCircle, FaSpinner, FaBrain } from 'react-icons/fa';
import axios from 'axios';
import { server } from '../../main';
import { UserData } from '../../context/UserContext';
// import './AITools.css'; // REMOVED: Assuming Tailwind handles all styling
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import KaTeXRenderer from '../../components/utils/KaTeXRenderer'; // Import KaTeXRenderer
import './AITools.css';
// A simple component to render markdown-like text for the analysis report
const MarkdownRenderer = ({ text }) => {
    if (!text) return null;
    const lines = text.split('\n').map((line, index) => {
        if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-bold text-purple-700 mt-4 mb-2">{line.substring(4)}</h3>;
        if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold text-purple-800 mt-6 mb-3">{line.substring(3)}</h2>;
        if (line.startsWith('**')) return <p key={index} className="my-1"><strong>{line.replace(/\*\*/g, '')}</strong></p>;
        if (line.startsWith('* ')) return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
        return <p key={index} className="my-1">{line}</p>;
    });
    return <div className="text-gray-800 text-left prose max-w-none">{lines}</div>;
};


// --- Main AITools Page Component ---
const AITools = () => {
  const [activeTab, setActiveTab] = useState('quiz');

  // --- 1. Quiz Generator Component (Defined INSIDE AITools) ---
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
      e.preventDefault(); setLoading(true); setQuiz(null); setError(null); setStudentAnswers({}); setShowResults(false);
      try {
        // CORRECTED: Use 'server' constant for API call
        const response = await axios.post(`${server}/api/generate-quiz`, { topic, difficulty, num_questions: 10 });
        if (response.data.success) { setQuiz(response.data.quiz); toast.success('Quiz generated successfully! Now, select your answers.'); } else { setError(response.data.message || 'Failed to generate quiz.'); toast.error(response.data.message || 'Failed to generate quiz.'); }
      } catch (err) { console.error('Error generating quiz:', err); setError(err.response?.data?.message || 'An unexpected error occurred.'); toast.error(err.response?.data?.message || 'An unexpected error occurred.');
      } finally { setLoading(false); }
    };
    const handleAnswerChange = (questionIndex, selectedOption) => { setStudentAnswers(prev => ({ ...prev, [questionIndex]: selectedOption })); };
    const handleSubmitQuiz = async () => {
      if (Object.keys(studentAnswers).length !== quiz.length) { toast.error('Please answer all questions before submitting.'); return; }
      setShowResults(true); const score = calculateScore(); const totalQuestions = quiz.length; 
      const userId = user?._id; // CORRECTED: Get userId dynamically from context
      if (!userId) { toast.error("Could not find user. Please ensure you're logged in."); return; }
      try {
        // CORRECTED: Use 'server' constant for API call
        const response = await axios.post(`${server}/api/submit-quiz-result`, { userId, topic: quiz[0].topic || topic, difficulty: quiz[0].difficulty || difficulty, score, totalQuestions });
        if (response.data.success) { toast.success('Quiz submitted and results saved!'); } else { toast.error(response.data.message || 'Failed to save quiz results.'); }
      } catch (err) { toast.error(err.response?.data?.message || 'Error saving quiz results.'); }
    };
    const calculateScore = () => { if (!quiz) return 0; return quiz.reduce((acc, q, index) => studentAnswers[index] === q.correct_answer ? acc + 1 : acc, 0); };
    return (
      <div className="bg-white p-6 rounded-lg shadow-inner w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Generate Math Quiz</h2>
        <form onSubmit={handleGenerateQuiz} className="space-y-4 mb-8 max-w-lg mx-auto">
          <div><label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Topic:</label><input type="text" id="topic" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Algebra, Calculus" required /></div>
          <div><label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level:</label><select id="difficulty" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option value="9th_10th_Olympiad">9th/10th Grade Olympiad</option><option value="11th_12th_JEE">11th/12th Grade JEE</option></select></div>
          <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center" disabled={loading}>{loading ? <FaSpinner className="animate-spin mr-2" /> : 'Generate Quiz'}</button>
        </form>
        {error && <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md"><p>{error}</p></div>}
        {quiz && (<div className="mt-8">{quiz.map((q, qIndex) => (<div key={qIndex} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50 question-card"><p className="font-bold text-lg text-gray-900 mb-2">Q{qIndex + 1}: {q.question}</p><div className="options-group">{q.options.map((option, optIndex) => (<label key={optIndex} className="block text-gray-700 mb-1 option-label"><input type="radio" name={`question-${qIndex}`} value={option.charAt(0)} onChange={() => handleAnswerChange(qIndex, option.charAt(0))} checked={studentAnswers[qIndex] === option.charAt(0)} className="mr-2" disabled={showResults} />{option}</label>))}</div>{showResults && (<div className="mt-2 text-sm"><p className={`font-semibold ${studentAnswers[qIndex] === q.correct_answer ? 'text-green-600' : 'text-red-600'}`}>Your Answer: {studentAnswers[qIndex] || 'Not answered'}</p><p className="text-green-600">Correct Answer: {q.correct_answer}</p></div>)}</div>))}
        {!showResults && <button onClick={handleSubmitQuiz} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-6 submit-quiz-button" disabled={!quiz || Object.keys(studentAnswers).length !== quiz.length}>Submit Quiz</button>}
        {showResults && <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-md text-center final-score"><h3 className="text-xl font-bold">Your Score: {calculateScore()} / {quiz.length}</h3></div>}</div>)}
      </div>
    );
  };

  // --- 2. Formula Generator Component (Defined INSIDE AITools) ---
  const FormulaGenerator = () => {
    const [chapter, setChapter] = useState('');
    const [classLevel, setClassLevel] = useState('10th Grade');
    const [competitiveLevel, setCompetitiveLevel] = useState('Olympiad');
    const [loading, setLoading] = useState(false);
    const [formulas, setFormulas] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerateFormulas = async (e) => {
      e.preventDefault(); setLoading(true); setFormulas(null); setError(null);
      try {
        // CORRECTED: Use 'server' constant for API call
        const response = await axios.post(`${server}/api/generate-formulas`, { chapter, class_level: classLevel, competitive_level: competitiveLevel });
        if (response.data.success) { setFormulas(response.data.formulas); toast.success('Formulas generated successfully!'); } else { setError(response.data.message || 'Failed to generate formulas.'); toast.error(response.data.message || 'Failed to generate formulas.'); }
      } catch (err) { console.error('Error generating formulas:', err); setError(err.response?.data?.message || 'An unexpected error occurred.'); toast.error(err.response?.data?.message || 'An unexpected error occurred.');
      } finally { setLoading(false); }
    };
    return (
      <div className="bg-white p-6 rounded-lg shadow-inner w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Generate Math Formulas</h2>
        <form onSubmit={handleGenerateFormulas} className="space-y-4 mb-8 max-w-lg mx-auto">
          <div><label htmlFor="chapter-formula" className="block text-sm font-medium text-gray-700 mb-1">Chapter:</label><input type="text" id="chapter-formula" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="e.g., Quadratic Equations, Trigonometry" required /></div>
          <div><label htmlFor="classLevel" className="block text-sm font-medium text-gray-700 mb-1">Class/Grade Level:</label><select id="classLevel" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={classLevel} onChange={(e) => setClassLevel(e.target.value)}><option value="9th Grade">9th Grade</option><option value="10th Grade">10th Grade</option><option value="11th Grade">11th Grade</option><option value="12th Grade">12th Grade</option></select></div>
          <div><label htmlFor="competitiveLevel" className="block text-sm font-medium text-gray-700 mb-1">Competitive Exam Level:</label><select id="competitiveLevel" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={competitiveLevel} onChange={(e) => setCompetitiveLevel(e.target.value)}><option value="Olympiad">Olympiad Level</option><option value="JEE">JEE Level</option><option value="Standard">Standard School Level</option></select></div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center font-semibold" disabled={loading}>{loading ? <FaSpinner className="animate-spin mr-3" /> : 'Generate Formulas'}</button>
        </form>
        {error && (<div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg"><p>{error}</p></div>)}
        {formulas && formulas.length > 0 && (<div className="mt-8 formula-display space-y-4"><h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Generated Formulas:</h3>{formulas.map((f, index) => (<div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 formula-card"><p className="font-bold text-md text-gray-900 mb-1">{f.name}</p><KaTeXRenderer latex={f.formula} /><p className="text-gray-700 text-sm">{f.description}</p></div>))}</div>)}
      </div>
    );
  };

  // --- 3. Recommendation Engine Component ---
  const RecommendationEngine = () => {
    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = UserData();
    useEffect(() => {
      const fetchRecommendation = async () => {
        const userId = user?._id;
        if (!userId) { setRecommendation("Please log in to get personalized recommendations."); setLoading(false); return; }
        setLoading(true); setError(null);
        try {
          // CORRECTED: Use 'server' constant for API call
          const response = await axios.get(`${server}/api/get-recommendations/${userId}`);
          if (response.data.success) { setRecommendation(response.data.recommendation); } else { setError(response.data.message || 'Failed to fetch recommendations.'); toast.error(response.data.message || 'Failed to fetch recommendations.'); }
        } catch (err) { console.error("Error fetching recommendation:", err); setError(err.response?.data?.message || 'An unexpected error occurred while fetching recommendations.'); toast.error(err.response?.data?.message || 'An unexpected error occurred while fetching recommendations.');
        } finally { setLoading(false); }
      };
      fetchRecommendation();
    }, [user]);
    return (
      <div className="bg-white p-6 rounded-lg shadow-inner w-full recommendation-main-card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Learning Recommendation</h2>
        <div className="p-5 bg-blue-50 rounded-lg border border-blue-200 shadow-md">
          <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center"><FaLightbulb className="mr-3 text-blue-500" /> Next Step:</h3>
          {loading ? <p className="text-blue-600 flex items-center"><FaSpinner className="animate-spin mr-2" /> Loading recommendation...</p> : error ? <p className="text-red-600">Error: {error}</p> : <p className="text-gray-800 text-lg">{recommendation}</p>}
        </div>
      </div>
    );
  };

  // --- 4. Performance Analysis Component ---
  const PerformanceAnalysis = () => {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const PIE_COLORS = ['#4ade80', '#f87171']; // Green-400 for Correct, Red-400 for Incorrect

    const handleAnalysisRequest = async () => {
      setLoading(true); setError(null); setAnalysis(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) { toast.error('You must be logged in to get an analysis.'); setLoading(false); return; }
        // CORRECTED: Use 'server' constant for API call
        const { data } = await axios.get(`${server}/api/user/performance-analysis`, { headers: { token: token } });
        if (data.success) {
          setAnalysis(data.analysis);
          toast.success('Analysis complete!');
        } else {
          setError(data.message || 'Failed to fetch analysis.');
          toast.error(data.message || 'Failed to fetch analysis.');
        }
      } catch (err) {
        console.error("Error fetching analysis:", err); const errorMessage = err.response?.data?.message || 'An unexpected error occurred.'; setError(errorMessage); toast.error(errorMessage);
      } finally { setLoading(false); }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-inner w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">AI Performance Analyst</h2>
        <p className="text-center text-gray-600 mb-6">Get a detailed analysis of your entire quiz history, visual charts, and a personalized study plan.</p>
        <div className="text-center mb-8">
          <button onClick={handleAnalysisRequest} disabled={loading} className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto">
            {loading ? <><FaSpinner className="animate-spin mr-3" />Analyzing...</> : <><FaBrain className="mr-3" />Analyze My Performance</>}
          </button>
        </div>

        {analysis && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-md">
            {analysis.chartData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Topic Performance (%)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analysis.chartData.topicPerformance} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="topic" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="averageScore" fill="#8884d8" name="Average Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Overall Accuracy</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={analysis.chartData.overallStats} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {analysis.chartData.overallStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><FaLightbulb className="mr-3 text-yellow-500" /> Your Personalized Report</h3>
            <MarkdownRenderer text={analysis.textReport} />
          </div>
        )}

        {error && (<div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg text-center"><p>Error: {error}</p></div>)}
      </div>
    );
  };


  const tabs = [
    { id: 'quiz', name: 'Quiz Generator', icon: FaQuestionCircle, component: <QuizGenerator /> },
    { id: 'formula', name: 'Formula Generator', icon: FaCalculator, component: <FormulaGenerator /> },
    { id: 'recommendation', name: 'Recommendations', icon: FaLightbulb, component: <RecommendationEngine /> },
    { id: 'analysis', name: 'Performance Analysis', icon: FaChartLine, component: <PerformanceAnalysis /> },
  ];

  const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">AI Tools Dashboard</h1>

        <div className="bg-white rounded-2xl shadow-lg">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 p-4">
            <nav className="flex items-center justify-center gap-3 md:gap-4 flex-wrap" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  } group inline-flex items-center justify-center py-3 px-5 rounded-full font-semibold border border-gray-300 transition-all duration-300 ease-in-out`}
                >
                  <tab.icon className="mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITools;
