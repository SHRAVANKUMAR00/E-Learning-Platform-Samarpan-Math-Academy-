import React, { useEffect, useState } from "react";
// import "./coursedescription.css"; // REMOVE THIS LINE
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const { data: { order } } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: { token },
        }
      );

      const options = {
        key: "rzp_test_hu4uSc3Jfsnnnj",
        amount: order.id,
        currency: "INR",
        name: "Samarpan",
        description: "Learn with us",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              { razorpay_order_id, razorpay_payment_id, razorpay_signature },
              {
                headers: { token },
              }
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
          }
        },
        theme: {
          color: "#8a4baf",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="min-h-screen bg-gray-100 py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Course Details Section */}
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <img
                      src={`${server}/${course.image}`}
                      alt={course.title}
                      className="w-full h-80 object-cover rounded-xl mb-6 shadow-md"
                    />
                    <div className="space-y-4">
                      <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{course.title}</h1>
                      <p className="text-gray-600 text-lg">
                        <span className="font-semibold text-gray-800">Instructor:</span> {course.createdBy}
                      </p>
                      <p className="text-gray-600 text-lg">
                        <span className="font-semibold text-gray-800">Duration:</span> {course.duration} weeks
                      </p>
                      <p className="text-2xl font-bold text-purple-600 pt-4">
                        Price: ₹{course.price}
                      </p>
                    </div>
                  </div>

                  {/* Description and Action Section */}
                  <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">Course Description</h3>
                      <p className="text-gray-700 leading-relaxed">{course.description}</p>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-gray-200">
                      {user && user.subscription.includes(course._id) ? (
                        <button
                          onClick={() => navigate(`/course/study/${course._id}`)}
                          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-green-700 shadow-md"
                        >
                          Continue to Study
                        </button>
                      ) : (
                        <button onClick={checkoutHandler} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-purple-700 shadow-md">
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;