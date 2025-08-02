import React from 'react';
import { FaBullseye, FaUserTie, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

// Import the new image from your assets folder
import profileImage from '../../assets/img.jpg';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold mb-4">About Samarpan Math Academy</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Dedicated to fostering a love for mathematics and empowering students to achieve their academic goals.
        </p>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Our Mission Section */}
        <div className="text-center mb-20">
          <FaBullseye className="text-5xl text-purple-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our mission is to provide high-quality, accessible, and personalized math education. We leverage innovative technology, including our AI-powered tools, to create an engaging learning environment that helps students build confidence and master complex mathematical concepts.
          </p>
        </div>

        {/* Combined Founder & Teacher Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
                {/* Image and Title */}
                <div className="md:w-1/3 text-center mb-6 md:mb-0 md:mr-8">
                    <img src={profileImage} alt="M.K YADAV" className="w-48 h-48 rounded-full mx-auto shadow-md border-4 border-purple-200 object-cover" />
                    <h3 className="text-2xl font-bold text-gray-800 mt-4">M.K YADAV</h3>
                    <p className="text-purple-600 font-semibold">Founder & Lead Educator</p>
                </div>

                {/* Bio and Qualifications */}
                <div className="md:w-2/3">
                    <FaUserTie className="text-4xl text-purple-500 mb-3" />
                    <h4 className="text-2xl font-bold text-gray-800 mb-3">From the Founder's Desk</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        "I started Samarpan Math Academy with a simple vision: to make quality math education accessible to every student. Growing up in Saharsa, Bihar, I understood the challenges students face. My goal is to bridge that gap through technology and a passion for teaching, creating a platform where curiosity is nurtured and potential is realized."
                    </p>
                    
                    <div className="border-t pt-4">
                        <div className="flex items-center mb-3">
                            <FaGraduationCap className="text-2xl text-pink-500 mr-3" />
                            <div>
                                <h5 className="font-bold text-gray-700">Educational Qualifications</h5>
                                <p className="text-gray-600">B.Sc. Mathematics, T.N.B. College, Bhagalpur</p>
                                <p className="text-gray-600">M.Sc. Mathematics, B.N.M.U. University</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaChalkboardTeacher className="text-2xl text-pink-500 mr-3" />
                            <div>
                                <h5 className="font-bold text-gray-700">Teaching Experience</h5>
                                <p className="text-gray-600">5+ years of dedicated teaching</p>
                                <p className="text-gray-600">Mentored over 500+ students for competitive exams</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
