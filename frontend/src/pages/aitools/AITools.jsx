import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FaLightbulb, FaCalculator, FaChartLine, FaQuestionCircle, FaSpinner, FaBrain } from 'react-icons/fa';
import axios from 'axios';
import { server } from '../../main';
import { UserData } from '../../context/UserContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KaTeXRenderer from '../../components/utils/KaTeXRenderer'; 
import './AITools.css';

// --- Markdown Renderer ---
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

// --- Main Component ---
const AITools = () => {
  const [activeTab, setActiveTab] = useState('quiz');

  // ==========================================
  // 1. QUIZ GENERATOR
  // ==========================================
  const QuizGenerator = () => {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('9th_10th_Olympiad');
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0); 
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState(null);
    const [studentAnswers, setStudentAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const { user } = UserData(); 

    useEffect(() => {
      let timer;
      if (cooldown > 0) timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }, [cooldown]);

    const handleGenerateQuiz = async (e) => {
      e.preventDefault(); 
      if (loading || cooldown > 0) return; 

      setLoading(true); setQuiz(null); setError(null); setStudentAnswers({}); setShowResults(false);

      try {
        const response = await axios.post(`${server}/api/generate-quiz`, { topic, difficulty, num_questions: 10 });
        if (response.data.success) { 
            setQuiz(response.data.quiz); 
            toast.success('Quiz generated!'); 
            setCooldown(15); 
        } else { 
            setError(response.data.message); 
            setCooldown(5);
        }
      } catch (err) { 
        if (err.response && err.response.status === 429) {
             const msg = "Server busy (Rate Limit). Waiting 60s...";
             setError(msg); toast.error(msg); setCooldown(60); 
        } else {
             setError('An unexpected error occurred.'); toast.error('Error occurred.'); setCooldown(5);
        }
      } finally { setLoading(false); }
    };

    const handleAnswerChange = (idx, opt) => setStudentAnswers(prev => ({ ...prev, [idx]: opt }));
    
    const handleSubmitQuiz = async () => {
      if (Object.keys(studentAnswers).length !== quiz.length) { toast.error('Answer all questions first.'); return; }
      setShowResults(true); 
      if (!user?._id) { toast.error("Please log in."); return; }
      try {
        await axios.post(`${server}/api/submit-quiz-result`, { 
            userId: user._id, 
            topic: topic,           
            difficulty: difficulty, 
            score: calculateScore(), 
            totalQuestions: quiz.length 
        });
        toast.success('Result saved!');
      } catch (err) { 
        console.error(err);
        toast.error('Error saving result.'); 
      }
    };
    
    const calculateScore = () => quiz ? quiz.reduce((acc, q, i) => studentAnswers[i] === q.correct_answer ? acc + 1 : acc, 0) : 0;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-inner w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Generate Math Quiz</h2>
        <form onSubmit={handleGenerateQuiz} className="space-y-4 mb-8 max-w-lg mx-auto">
          <input type="text" className="w-full px-4 py-2 border rounded-md" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic (e.g., Algebra)" required />
          <select className="w-full px-4 py-2 border rounded-md" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="9th_10th_Olympiad">9th/10th Olympiad</option>
              <option value="11th_12th_JEE">11th/12th JEE</option>
          </select>
          <button type="submit" className={`w-full py-2 px-4 rounded-md font-bold text-white ${loading || cooldown > 0 ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`} disabled={loading || cooldown > 0}>
            {loading ? <><FaSpinner className="animate-spin mr-2 inline" /> Generating...</> : cooldown > 0 ? `Please Wait ${cooldown}s` : 'Generate Quiz'}
          </button>
        </form>
        {error && <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
        {quiz && (
            <div className="mt-8">
                {quiz.map((q, i) => (
                    <div key={i} className="mb-6 p-4 border rounded-md bg-gray-50">
                        {/* Question: Using KaTeXRenderer */}
                        <div className="font-bold mb-2 flex flex-col sm:flex-row sm:items-start gap-1 text-lg">
                           <span className="whitespace-nowrap">Q{i + 1}:</span> 
                           <KaTeXRenderer text={q.question} />
                        </div>
                        
                        <div className="mt-3 space-y-2">
                        {q.options.map((opt, j) => (
                            <label key={j} className="block cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                                <div className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name={`q-${i}`} 
                                        value={opt.charAt(0)} 
                                        onChange={() => handleAnswerChange(i, opt.charAt(0))} 
                                        checked={studentAnswers[i] === opt.charAt(0)} 
                                        className="mr-3 h-4 w-4 text-purple-600" 
                                        disabled={showResults} 
                                    />
                                    {/* Options: Using KaTeXRenderer */}
                                    <KaTeXRenderer text={opt} />
                                </div>
                            </label>
                        ))}
                        </div>
                        
                        {showResults && <p className={`mt-3 font-bold ${studentAnswers[i] === q.correct_answer ? 'text-green-600' : 'text-red-600'}`}>Correct Answer: {q.correct_answer}</p>}
                    </div>
                ))}
                {!showResults && <button onClick={handleSubmitQuiz} className="w-full bg-green-600 text-white py-3 rounded-md mt-4 font-bold hover:bg-green-700 transition-colors">Submit Quiz</button>}
                {showResults && <div className="mt-4 p-4 bg-blue-100 text-center font-bold text-xl rounded border border-blue-200 text-blue-800">Score: {calculateScore()} / {quiz.length}</div>}
            </div>
        )}
      </div>
    );
  };

  // ==========================================
  // 2. FORMULA GENERATOR
  // ==========================================
  const FormulaGenerator = () => {
    const [chapter, setChapter] = useState('');
    const [classLevel, setClassLevel] = useState('10th Grade');
    const [competitiveLevel, setCompetitiveLevel] = useState('Olympiad');
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0); 
    const [formulas, setFormulas] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      let timer;
      if (cooldown > 0) timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }, [cooldown]);

    const handleGenerateFormulas = async (e) => {
      e.preventDefault(); 
      if (loading || cooldown > 0) return;

      setLoading(true); setFormulas(null); setError(null);

      try {
        const response = await axios.post(`${server}/api/generate-formulas`, { chapter, class_level: classLevel, competitive_level: competitiveLevel });
        if (response.data.success) { 
            setFormulas(response.data.formulas); 
            toast.success('Formulas generated!'); 
            setCooldown(15); 
        } else { 
            setError(response.data.message); 
            setCooldown(5);
        }
      } catch (err) { 
        if (err.response && err.response.status === 429) {
             const msg = "Server busy (Rate Limit). Waiting 60s...";
             setError(msg); toast.error(msg); setCooldown(60);
        } else {
             setError('An unexpected error occurred.'); toast.error('Error occurred.'); setCooldown(5);
        }
      } finally { setLoading(false); }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-inner w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Generate Math Formulas</h2>
        <form onSubmit={handleGenerateFormulas} className="space-y-4 mb-8 max-w-lg mx-auto">
          <input type="text" className="w-full px-4 py-2 border rounded-md" value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="Chapter (e.g., Trigonometry)" required />
          <select className="w-full px-4 py-2 border rounded-md" value={classLevel} onChange={(e) => setClassLevel(e.target.value)}>
              <option>9th Grade</option><option>10th Grade</option><option>11th Grade</option><option>12th Grade</option>
          </select>
          <select className="w-full px-4 py-2 border rounded-md" value={competitiveLevel} onChange={(e) => setCompetitiveLevel(e.target.value)}>
              <option>Olympiad</option><option>JEE</option><option>Standard</option>
          </select>
          <button type="submit" className={`w-full py-3 px-8 rounded-lg font-semibold text-white ${loading || cooldown > 0 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={loading || cooldown > 0}>
            {loading ? <><FaSpinner className="animate-spin mr-3 inline" /> Generating...</> : cooldown > 0 ? `Please Wait ${cooldown}s` : 'Generate Formulas'}
          </button>
        </form>
        {error && <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>}
        {formulas && (
            <div className="mt-8 space-y-4">
                {formulas.map((f, i) => (
                    <div key={i} className="p-4 border rounded-lg bg-gray-50 hover:shadow-md transition-shadow">
                        <p className="font-bold text-lg mb-2 text-purple-700">{f.name}</p>
                        
                        <div className="my-2 p-3 bg-gray-100 rounded text-center overflow-x-auto">
                           {/* SAFETY FIX: Remove existing $$ then add our own to ensure Block Math */}
                           <KaTeXRenderer text={`$$ ${f.formula ? f.formula.replace(/\$\$/g, '') : ''} $$`} />
                        </div>

                        <p className="text-sm text-gray-700 italic mt-2">{f.description}</p>
                    </div>
                ))}
            </div>
        )}
      </div>
    );
  };

  // ==========================================
  // 3. RECOMMENDATION ENGINE
  // ==========================================
  const RecommendationEngine = () => {
    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = UserData();

    useEffect(() => {
      const fetchRecommendation = async () => {
        if (!user?._id) { setRecommendation("Log in for recommendations."); setLoading(false); return; }
        try {
          const res = await axios.get(`${server}/api/get-recommendations/${user._id}`);
          setRecommendation(res.data.success ? res.data.recommendation : "No recommendations yet.");
        } catch (err) { setRecommendation("Could not fetch recommendations."); } 
        finally { setLoading(false); }
      };
      fetchRecommendation();
    }, [user]);

    return (
      <div className="bg-white p-6 rounded-lg shadow-inner w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Learning Recommendation</h2>
        <div className="p-5 bg-blue-50 rounded-lg border border-blue-200 shadow-md">
          <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center"><FaLightbulb className="mr-3" /> Next Step:</h3>
          {loading ? <p className="text-blue-600"><FaSpinner className="animate-spin mr-2 inline" /> Loading...</p> : <p className="text-gray-800 text-lg">{recommendation}</p>}
        </div>
      </div>
    );
  };

  // ==========================================
  // 4. PERFORMANCE ANALYSIS
  // ==========================================
  const PerformanceAnalysis = () => {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cooldown, setCooldown] = useState(0); 

    useEffect(() => {
        let timer;
        if (cooldown > 0) timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleAnalysisRequest = async () => {
      if (loading || cooldown > 0) return;
      setLoading(true); setError(null); setAnalysis(null);
      
      const token = localStorage.getItem('token');
      if (!token) { toast.error('Please log in.'); setLoading(false); return; }

      try {
        const { data } = await axios.get(`${server}/api/user/performance-analysis`, { headers: { token } });
        if (data.success) { 
            setAnalysis(data.analysis); 
            toast.success('Analysis complete!'); 
            setCooldown(15);
        } else { 
            setError(data.message); 
            setCooldown(5);
        }
      } catch (err) {
        if (err.response && err.response.status === 429) {
            const msg = "Server busy. Waiting 60s...";
            setError(msg); toast.error(msg); setCooldown(60);
       } else {
            setError('Error fetching analysis.'); 
            setCooldown(5);
       }
      } finally { setLoading(false); }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-inner w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">AI Performance Analyst</h2>
        <div className="text-center mb-8">
          <button onClick={handleAnalysisRequest} disabled={loading || cooldown > 0} className={`text-white font-bold py-3 px-8 rounded-full ${loading || cooldown > 0 ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}>
            {loading ? <><FaSpinner className="animate-spin mr-3 inline" />Analyzing...</> : cooldown > 0 ? `Wait ${cooldown}s` : <><FaBrain className="mr-3 inline" />Analyze My Performance</>}
          </button>
        </div>
        {analysis && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-md">
            {analysis.chartData && (
              <div className="h-64 mb-8">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysis.chartData.topicPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="topic" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="averageScore" fill="#8884d8" name="Avg Score" />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
            )}
            <MarkdownRenderer text={analysis.textReport} />
          </div>
        )}
        {error && <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>}
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
          <div className="border-b border-gray-200 p-4 flex justify-center gap-3 flex-wrap">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? 'bg-purple-600 text-white transform scale-105' : 'bg-white text-gray-600 hover:bg-gray-200'} py-3 px-5 rounded-full font-semibold border transition-all`}>
                  <tab.icon className="mr-2 inline" /> {tab.name}
                </button>
              ))}
          </div>
          <div className="p-6">{activeComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default AITools;