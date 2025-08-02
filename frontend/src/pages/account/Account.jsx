import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { UserData } from '../../context/UserContext';
import profileImage from '../../assets/user_logo.jpg'; // ENSURED: Using your logo as the profile image

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-24"></div>
        <div className="p-8">
          {/* Profile Picture */}
          <div className="transform -translate-y-20 flex justify-center">
            <img 
              src={profileImage} 
              alt="User Profile" 
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>

          {/* User Info */}
          <div className="text-center -mt-12">
            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 capitalize">{user.role}</p>
          </div>

          <div className="mt-10 space-y-6 border-t pt-6">
            <div className="flex items-center text-gray-700">
              <FaUserCircle className="text-purple-500 w-6 h-6 mr-4" />
              <div>
                <p className="font-semibold">Name</p>
                <p className="text-gray-600">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <FaEnvelope className="text-purple-500 w-6 h-6 mr-4" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 space-y-4">
            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="w-full flex items-center justify-center bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-in-out"
            >
              <FaTachometerAlt className="mr-3" />
              Student Dashboard
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="w-full flex items-center justify-center bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 ease-in-out"
              >
                <FaTachometerAlt className="mr-3" />
                Admin Dashboard
              </button>
            )}

            <button
              onClick={logoutHandler}
              className="w-full flex items-center justify-center bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 ease-in-out"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
