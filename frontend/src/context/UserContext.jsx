import { createContext, useContext, useEffect, useState } from "react"; // Corrected syntax: 'from' instead of '=>'
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Changed initial state to null for clarity
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchMyCourse();
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      // Improved error logging for login
      console.error("Login Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "An error occurred during login.");
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      setBtnLoading(false);
      // Improved error logging for register
      console.error("Register Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "An error occurred during registration.");
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (error) {
      // Improved error logging for verify OTP
      console.error("Verify OTP Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "An error occurred during OTP verification.");
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    setLoading(true); // Indicate loading for user data
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // console.log("No token found, user not authenticated."); // Debug log
        setIsAuth(false);
        setUser(null);
        setLoading(false);
        return;
      }

      // console.log("Token found, attempting to fetch user profile..."); // Debug log
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token,
        },
      });

      // console.log("User profile fetched successfully:", data.user); // Debug log
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      // CRITICAL: Log the detailed error response for debugging 401
      console.error("Error fetching user profile (fetchUser):", error.response?.status, error.response?.data || error.message);
      localStorage.removeItem("token"); // Clear invalid token
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false); // Always set loading to false
    }
  }

  useEffect(() => {
    fetchUser();
  }, []); // Run once on mount to check initial auth status

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser, // Expose fetchUser
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
