import React, { useEffect } from "react";
// import "./coursestudy.css"; // REMOVE THIS LINE
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const { fetchCourse, course, loading } = CourseData();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {course && (
        <div className="bg-gray-100 min-h-screen py-16 flex flex-col items-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-6">
              {course.title}
            </h1>

            <img
              src={`${server}/${course.image}`}
              alt={course.title}
              className="w-full max-w-4xl h-auto rounded-xl shadow-lg mx-auto mb-8"
            />

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                {course.description}
              </p>
              <p className="text-md text-gray-500">
                <span className="font-semibold text-gray-700">by:</span> {course.createdBy}
              </p>
              <p className="text-md text-gray-500">
                <span className="font-semibold text-gray-700">Duration:</span> {course.duration} weeks
              </p>
            </div>

            <div className="mt-12">
              <Link
                to={`/lectures/${course._id}`}
                className="inline-block bg-purple-600 text-white py-3 px-8 rounded-full font-bold shadow-md hover:bg-purple-700 transition-colors"
              >
                Go to Lectures
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;