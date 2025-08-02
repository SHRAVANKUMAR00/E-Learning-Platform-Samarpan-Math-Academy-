import React from "react";
// import "./dashbord.css"; // REMOVE THIS LINE
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import Loading from "../../components/loading/Loading";
import { UserData } from "../../context/UserContext";

const Dashboard = () => {
  const { mycourse, loading } = CourseData();
  const { userLoading } = UserData();

  if (loading || userLoading) {
    return <Loading />;
  }
  
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          All Enrolled Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mycourse && mycourse.length > 0 ? (
            mycourse.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 text-xl mt-8">
              No courses Enrolled Yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;