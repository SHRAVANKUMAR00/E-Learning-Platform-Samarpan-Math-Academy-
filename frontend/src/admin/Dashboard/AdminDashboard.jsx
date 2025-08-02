import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
// import "./dashboard.css"; // REMOVE THIS LINE
import { FaBook, FaChalkboard, FaUsers, FaSpinner } from "react-icons/fa";
import Loading from "../../components/loading/Loading";
import { UserData } from "../../context/UserContext";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();
  const { userLoading } = UserData();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || userLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Admin Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Total Courses Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-3 transition-transform duration-300 transform hover:scale-105">
              <FaBook className="text-4xl text-purple-600 mb-2" />
              <p className="text-gray-500 text-sm font-medium">Total Courses</p>
              <p className="text-4xl font-bold text-gray-800">{stats.totalCoures}</p>
            </div>
            {/* Total Lectures Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-3 transition-transform duration-300 transform hover:scale-105">
              <FaChalkboard className="text-4xl text-purple-600 mb-2" />
              <p className="text-gray-500 text-sm font-medium">Total Lectures</p>
              <p className="text-4xl font-bold text-gray-800">{stats.totalLectures}</p>
            </div>
            {/* Total Users Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-3 transition-transform duration-300 transform hover:scale-105">
              <FaUsers className="text-4xl text-purple-600 mb-2" />
              <p className="text-gray-500 text-sm font-medium">Total Users</p>
              <p className="text-4xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashbord;