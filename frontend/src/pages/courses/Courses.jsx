import React from "react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import Loading from "../../components/loading/Loading";
import { UserData } from "../../context/UserContext";

const Courses = () => {
  const { courses, loading } = CourseData();
  const { userLoading } = UserData(); // Keep this for the overall loading check if needed elsewhere

  if (loading || userLoading) { // Retain userLoading check if it impacts overall page loading
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Available Courses
        </h2>
        
        {/* This div is the key to centering the entire grid block */}
        <div className="flex justify-center">
          {/* Added mx-auto and w-fit to explicitly center the grid itself.
              Reverted md:grid-cols-2 back to md:grid-cols-3 as seen in screenshots for more columns. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto w-fit">
            {courses && courses.length > 0 ? (
              courses.map((e) => <CourseCard key={e._id} course={e} h_full={true} />) // Pass h_full prop
            ) : (
              <p className="col-span-full text-center text-gray-500 text-xl mt-8">
                No Courses Yet!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
