import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import Testimonials from "../../components/testimonials/Testimonials";
import { FaGraduationCap, FaRobot, FaLaptopCode, FaEye, FaLightbulb, FaCrosshairs, FaChartLine, FaBookOpen, FaRocket, FaStar, FaInfoCircle } from 'react-icons/fa'; // Import necessary icons, added FaInfoCircle

// Receive isAuth as a prop
const Home = ({ isAuth }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image with Overlay for a richer look */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1535131749006-b7f58f994e99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Math Learning Background" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Hero background color */}
        <div className="absolute inset-0" style={{backgroundColor: '#8B008B', opacity: 0.9}}></div>


        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-down">
            Unlock Your Math Potential with Samarpan Academy
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto mb-10 animate-fade-in-up">
            Master complex concepts with expert-led courses, personalized learning paths, and cutting-edge AI tools for quizzes and formula generation.
          </p>
          {/* Button always shows "Explore Our Courses" and navigates to /courses */}
          <button 
            onClick={() => navigate("/courses")} 
            className="inline-block bg-white text-purple-700 py-3 px-10 rounded-full font-bold shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-bounce-in"
          >
            Explore Our Courses
          </button>
        </div>
      </div>
      
      {/* Why Choose Samarpan Math Academy? Section - Enhanced with Icons and Animations */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 animate-fade-in">
            Why Choose Samarpan Math Academy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl shadow-md bg-purple-50 text-purple-800 transform transition-transform duration-300 hover:scale-105 animate-slide-in-left flex flex-col items-center">
              <FaGraduationCap className="text-5xl mb-4 text-purple-600" /> {/* Icon added */}
              <h3 className="text-xl font-bold mb-3">Expert-Led Courses</h3>
              <p className="text-gray-700">Learn from experienced instructors who simplify complex math topics for clear understanding, ensuring a strong foundation.</p>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-blue-50 text-blue-800 transform transition-transform duration-300 hover:scale-105 animate-fade-in-up-delay-1 flex flex-col items-center">
              <FaRobot className="text-5xl mb-4 text-blue-600" /> {/* Icon added */}
              <h3 className="text-xl font-bold mb-3">AI-Powered Learning</h3>
              <p className="text-gray-700">Utilize our smart tools for instant quiz generation, comprehensive formula lookups, and personalized recommendations based on your progress.</p>
              {/* NEW: Explore AI Tools button */}
              <button 
                onClick={() => navigate("/ai-tools")} 
                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                Explore AI Tools
              </button>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-green-50 text-green-800 transform transition-transform duration-300 hover:scale-105 animate-slide-in-right flex flex-col items-center">
              <FaLaptopCode className="text-5xl mb-4 text-green-600" /> {/* Icon added */}
              <h3 className="text-xl font-bold mb-3">Flexible & Accessible</h3>
              <p className="text-gray-700">Study at your own pace, anytime, anywhere. Our platform is designed for your convenience, fitting into your busy schedule.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Vision Section - Enhanced with Icon */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 animate-fade-in flex items-center justify-center">
            <FaEye className="text-purple-600 mr-4" /> Our Vision
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto animate-fade-in-up-delay-2">
            At Samarpan Math Academy, we envision a world where every student can conquer their fear of mathematics and unlock their full potential. We are committed to providing high-quality, accessible, and innovative learning experiences that foster deep understanding and a lifelong love for numbers.
          </p>
          {/* NEW: Link to About Us page */}
          <Link 
            to="/about" 
            className="inline-block mt-8 bg-purple-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-md animate-bounce-in"
          >
            Learn More About Us
          </Link>
        </div>
      </div>

      {/* Removed About Us Section */}
      {/* <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 animate-fade-in flex items-center justify-center">
            <FaInfoCircle className="text-purple-600 mr-4" /> About Us
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto animate-fade-in-up-delay-8">
            Samarpan Math Academy was founded with a passion for making mathematics accessible and enjoyable for students of all levels. Our team of dedicated educators and technologists work tirelessly to create a learning environment that is both challenging and supportive. We believe in fostering a deep conceptual understanding, not just rote memorization, empowering students to confidently tackle any mathematical problem.
          </p>
        </div>
      </div> */}

      {/* Key Features/Benefits Section - Replaced Emojis with Icons */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 animate-fade-in">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 rounded-xl shadow-md bg-yellow-50 text-yellow-800 animate-fade-in-up-delay-3">
              <FaLightbulb className="text-4xl mb-3 text-yellow-600" /> {/* Icon */}
              <h3 className="text-xl font-bold mb-2">Conceptual Clarity</h3>
              <p className="text-gray-700 text-center text-sm">Focus on building strong fundamentals through clear explanations.</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl shadow-md bg-red-50 text-red-800 animate-fade-in-up-delay-4">
              <FaCrosshairs className="text-4xl mb-3 text-red-600" /> {/* Icon */}
              <h3 className="text-xl font-bold mb-2">Targeted Practice</h3>
              <p className="text-gray-700 text-center text-sm">Practice with quizzes tailored to your specific needs and difficulty levels.</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl shadow-md bg-indigo-50 text-indigo-800 animate-fade-in-up-delay-5">
              <FaChartLine className="text-4xl mb-3 text-indigo-600" /> {/* Icon */}
              <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
              <p className="text-gray-700 text-center text-sm">Monitor your progress with detailed analytics and AI-driven insights.</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl shadow-md bg-teal-50 text-teal-800 animate-fade-in-up-delay-6">
              <FaBookOpen className="text-4xl mb-3 text-teal-600" /> {/* Icon */}
              <h3 className="text-xl font-bold mb-2">Rich Content Library</h3>
              <p className="text-gray-700 text-center text-sm">Access a vast collection of courses, lectures, and resources.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section - Enhanced with Icon */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 animate-fade-in flex items-center justify-center">
            <FaRocket className="text-white mr-4" /> Ready to Transform Your Math Journey?
          </h2>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto mb-10 animate-fade-in-up-delay-7">
            Join thousands of students who are achieving their academic goals with Samarpan Math Academy.
          </p>
          {/* This button remains conditionally rendered based on isAuth */}
          {!isAuth ? (
            <button 
              onClick={() => navigate("/register")} 
              className="inline-block bg-white text-purple-700 py-3 px-10 rounded-full font-bold shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-bounce-in"
            >
              Sign Up Today!
            </button>
          ) : (
            <button 
              onClick={() => navigate(`/${user._id}/dashboard`)} /* Navigate to user's dashboard */
              className="inline-block bg-white text-purple-700 py-3 px-10 rounded-full font-bold shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-bounce-in"
            >
              Go to Dashboard {/* Changed button text */}
            </button>
          )}
        </div>
      </div>

      {/* Testimonials Section (already updated) */}
      <Testimonials />
    </div>
  );
};

export default Home;
