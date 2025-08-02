import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import { FaSpinner } from 'react-icons/fa';

const categories = [
  "9th Class JEE Foundation",
  "10th Class JEE Foundation",
  "11th Class JEE Foundation",
  "12th Class JEE Foundation",
  "Target JEE Mains",
  "Target JEE Advanced",
  "Target Olympiad",
];

const AddCourse = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      // Redirect back to the courses list after successful submission
      navigate('/admin/course');
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Add a New Course
            </h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700 mb-1">
                  Created By
                </label>
                <input
                  type="text"
                  id="createdBy"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value={""}>Select Category</option>
                  {categories.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <input type="file" id="image" required onChange={changeImageHandler} className="w-full border border-gray-300 rounded-md p-2"/>
              </div>
              {imagePrev && <img src={imagePrev} alt="Course Preview" className="mt-4 rounded-lg w-full object-cover" />}

              <button
                type="submit"
                disabled={btnLoading}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-purple-700 mt-4 flex items-center justify-center"
              >
                {btnLoading ? <><FaSpinner className="animate-spin mr-2"/>Please Wait...</> : "Add Course"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCourse;