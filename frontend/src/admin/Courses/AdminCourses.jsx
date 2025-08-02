import React from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import Loading from "../../components/loading/Loading";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const { courses, loading } = CourseData();

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            All Courses
          </h1>
          {loading ? (
            <Loading />
          ) : (
            // This div ensures the entire grid of cards is centered
            <div className="flex justify-center">
              {/* The grid for course cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {courses && courses.length > 0 ? (
                  courses.map((e) => {
                    return <CourseCard key={e._id} course={e} />;
                  })
                ) : (
                  <p className="col-span-full text-center text-gray-500 text-xl mt-8">
                    No Courses Yet
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;