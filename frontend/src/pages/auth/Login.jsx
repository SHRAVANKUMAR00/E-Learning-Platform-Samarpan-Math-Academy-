import React, { useState } from "react";
import "./auth.css"; // Assuming you still have this for general auth page styling
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import { GoogleLogin } from '@react-oauth/google'; // NEW: Import GoogleLogin component
import { toast } from 'react-hot-toast'; // Ensure toast is imported for notifications
import axios from 'axios'; // Import axios for backend call
import { server } from '../../main'; // Import server URL

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser, fetchUser } = UserData(); // Added fetchUser from UserData
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  // NEW: Google login success handler
  const googleSuccessHandler = async (credentialResponse) => {
    try {
      // Send the Google credential to your backend for verification
      const { data } = await axios.post(`${server}/api/user/google-login`, {
        token: credentialResponse.credential,
      });

      if (data.success) {
        localStorage.setItem("token", data.token); // Store your app's JWT
        await fetchUser(); // Fetch user data after login
        await fetchMyCourse(); // Fetch user's courses
        toast.success(data.message);
        navigate("/"); // Redirect to home or dashboard
      } else {
        toast.error(data.message || "Google login failed.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || "An error occurred during Google login.");
    }
  };

  // NEW: Google login error handler
  const googleErrorHandler = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button disabled={btnLoading} type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-semibold flex items-center justify-center">
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">
            Don't have an account? <Link to="/register" className="text-purple-600 hover:underline font-medium">Register</Link>
          </p>
          <p className="text-gray-600">
            <Link to="/forgot" className="text-purple-600 hover:underline font-medium">Forgot password?</Link>
          </p>
        </div>

        {/* NEW: Google Login Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-4">Or login with</p>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={googleSuccessHandler}
              onError={googleErrorHandler}
              useOneTap // Optional: for a smoother one-tap experience
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
