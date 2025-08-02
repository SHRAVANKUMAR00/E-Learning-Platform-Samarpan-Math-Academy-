import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMyCourse] = useState([]);
  const [loading, setLoading] = useState(true); // NEW: Add a loading state

  async function fetchCourses() {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses);
    } catch (error) {
      console.log("Error fetching all courses:", error);
      setCourses([]); // Ensure courses is empty on error
    } finally {
      setLoading(false); // Set loading to false when fetching completes (success or error)
    }
  }

  async function fetchCourse(id) {
    try {
      // You might want a separate loading state for single course fetch if needed
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.log("Error fetching single course:", error);
      setCourse({}); // Ensure course is empty on error
    }
  }

  async function fetchMyCourse() {
    try {
      const token = localStorage.getItem("token");
      if (!token) { // If no token, don't attempt to fetch my courses
        setMyCourse([]);
        return;
      }
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: {
          token,
        },
      });
      setMyCourse(data.courses);
    } catch (error) {
      console.log("Error fetching my courses (likely not logged in):", error);
      setMyCourse([]); // Ensure mycourse is empty on error
    }
  }

  useEffect(() => {
    // Fetch all courses first
    fetchCourses();
    // Then attempt to fetch my courses (which will handle auth internally)
    fetchMyCourse(); 
  }, []); // Empty dependency array means this runs once on mount

  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
        loading, // NEW: Expose the loading state
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
