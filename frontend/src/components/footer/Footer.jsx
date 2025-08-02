import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaBookOpen,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  // Updated with extracted links from the image
  const socialLinks = {
    facebook: "https://www.facebook.com/share/1DwhFgiFtW", // Extracted from image
    instagram: "https://instagram.com/m.k.yadav2000", // Extracted from image
    telegram: "https://t.me/Samarpanacademy", // Extracted from image
    whatsapp: "https://chat.whatsapp.com/Luru6pYkIqY0DU2Y2L3mode", // Extracted from image
    phone: "+916201212522", // Existing phone number
    email: "msamarpan44@gmail.com", // Extracted from image
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand and About */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <FaBookOpen className="text-purple-400 mr-3" size={30} />
              <h2 className="text-2xl font-bold">Samarpan Math Academy</h2>
            </div>
            <p className="text-gray-400">
              Empowering students to excel in mathematics through high-quality courses, personalized learning, and innovative AI-powered tools.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Navigate</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-white transition-colors">All Courses</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/ai-tools" className="text-gray-400 hover:text-white transition-colors">AI Tools</Link></li>
            </ul>
          </div>

          {/* Column 3: Student Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://questions.examside.com/past-years/jee/jee-main" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">JEE PYQs</a></li>
              <li><a href="https://www.amazon.in/s?k=jee+main+and+advanced+books" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">JEE Books (Amazon)</a></li>
              <li><a href="https://olympiads.hbcse.tifr.res.in/how-to-prepare/past-papers/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Olympiad PYQs</a></li>
              <li><a href="https://www.flipkart.com/search?q=math+olympiad+books" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Olympiad Books (Flipkart)</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wider">Get in Touch</h3>
             {/* Updated email link */}
             <a href={`mailto:${socialLinks.email}`} className="text-gray-400 hover:text-white transition-colors mb-4 block">{socialLinks.email}</a>
             {/* Phone number */}
             <a href={`tel:${socialLinks.phone}`} className="text-gray-400 hover:text-white transition-colors mb-4 flex items-center">
                <FaPhone className="mr-2 flex-shrink-0" />
                <span>{socialLinks.phone}</span>
             </a>
             <a href="https://www.google.com/maps/place/Saharsa,+Bihar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                <span>Saharsa, Bihar</span>
             </a>
            <div className="flex space-x-4">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-purple-600 p-3 rounded-full transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-[#E1306C] p-3 rounded-full transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-blue-500 p-3 rounded-full transition-colors">
                <FaTelegramPlane size={20} />
              </a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-green-500 p-3 rounded-full transition-colors">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Samarpan Math Academy. All Rights Reserved.</p>
          <p className="mt-2 text-sm">Made with ❤️ by <a href="https://github.com/SHRAVANKUMAR00" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Shravan Kumar</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
