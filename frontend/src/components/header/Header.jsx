import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.jpg'; // Import the logo

const Header = ({ isAuth }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Samarpan Math Academy Logo" className="h-12 w-12 mr-3 rounded-full" />
          <span className="text-xl font-bold text-gray-800">Samarpan Math Academy</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Home</Link>
          <Link to="/courses" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Courses</Link>
          <Link to="/about" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">About</Link>
          {isAuth ? (
            <>
              <Link to="/ai-tools" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">AI Tools</Link>
              <Link to="/account" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Account</Link>
            </>
          ) : (
            <Link to="/login" className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition-colors font-semibold">Login</Link>
          )}
        </nav>
        
        {/* Mobile Menu Button (functionality can be added later) */}
        <div className="md:hidden">
            <button className="text-gray-800 focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
