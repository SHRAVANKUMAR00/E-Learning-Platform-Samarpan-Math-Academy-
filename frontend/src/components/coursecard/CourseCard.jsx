import React from "react";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

// Receive a new prop 'h_full'
const CourseCard = ({ course, h_full }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  
  return (
    // Add h-full to make the card fill the grid cell
    <div className={`bg-white rounded-xl shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 ${h_full ? 'h-full' : ''}`}>
      <img 
        src={`${server}/${course.image}`} 
        alt={course.title} 
        className="w-full h-40 object-cover rounded-t-lg mb-4" 
      />
      
      {/* This flex-grow div is the key to aligning content consistently */}
      <div className="flex flex-col flex-grow space-y-2">
        <h3 className="font-bold text-xl text-gray-800">{course.title}</h3>
        <p className="text-sm text-gray-600">Instructor: {course.createdBy}</p>
        <p className="text-sm text-gray-600">Duration: {course.duration} weeks</p>
        <p className="text-lg font-bold text-purple-600 mt-2">₹{course.price}</p>
      </div>

      <div className="mt-4">
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-purple-700"
                  >
                    Study
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-purple-700"
                  >
                    Get Started
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-purple-700"
              >
                Study
              </button>
            )}
          </>
        ) : (
          <button onClick={() => navigate("/login")} className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-purple-700">
            Get Started
          </button>
        )}
      </div>

      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-red-700 mt-2"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;