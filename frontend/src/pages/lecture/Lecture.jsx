import React, { useEffect, useState } from "react";
// import "./lecture.css"; // REMOVE THIS LINE
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { FaPlus, FaTimes, FaTrash, FaSpinner } from "react-icons/fa";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message);
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, [params.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 min-h-screen py-8 md:py-16">
          <div className="container mx-auto px-4">
            {/* Progress Bar */}
            <div className="max-w-4xl mx-auto mb-10 text-center text-gray-700 font-semibold">
              <h2 className="text-xl md:text-2xl mb-2">
                Lecture completed - {completedLec} out of {lectLength}
              </h2>
              <div className="bg-gray-300 w-full rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${completed}%` }}
                ></div>
              </div>
              <span className="text-sm mt-2 block">{completed || 0}%</span>
            </div>

            {/* Main Content: Video Player and Lecture List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Video Player */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4">
                {lecLoading ? (
                  <div className="h-96 flex items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <>
                    {lecture.video ? (
                      <>
                        <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                          <video
                            src={`${server}/${lecture.video}`}
                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                            controls
                            controlsList="nodownload noremoteplayback"
                            disablePictureInPicture
                            disableRemotePlayback
                            autoPlay
                            onEnded={() => addProgress(lecture._id)}
                          ></video>
                        </div>
                        <div className="mt-6 space-y-2">
                          <h1 className="text-3xl font-bold text-gray-800">{lecture.title}</h1>
                          <p className="text-md text-gray-600">{lecture.description}</p>
                        </div>
                      </>
                    ) : (
                      <div className="h-96 flex items-center justify-center">
                        <h1 className="text-2xl font-bold text-gray-500">Please Select a Lecture</h1>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Right Column: Lecture List & Admin Tools */}
              <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-4">
                {user && user.role === "admin" && (
                  <button
                    onClick={() => setShow(!show)}
                    className={`w-full text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center ${
                      show ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {show ? <FaTimes className="mr-2" /> : <FaPlus className="mr-2" />}
                    {show ? "Close" : "Add Lecture"}
                  </button>
                )}

                {show && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Add Lecture</h2>
                    <form onSubmit={submitHandler} className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"/>
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"/>
                      </div>
                      <div>
                        <label htmlFor="video-file" className="block text-sm font-medium text-gray-700 mb-1">Video File</label>
                        <input type="file" id="video-file" accept="video/*" onChange={changeVideoHandler} required className="w-full border border-gray-300 rounded-md p-2"/>
                      </div>
                      {videoPrev && (
                        <video src={videoPrev} className="w-full rounded-md" controls></video>
                      )}
                      <button disabled={btnLoading} type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-purple-700 flex items-center justify-center">
                        {btnLoading ? <><FaSpinner className="animate-spin mr-2" />Please Wait...</> : "Add"}
                      </button>
                    </form>
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  {lectures && lectures.length > 0 ? (
                    lectures.map((e, i) => (
                      <div
                        key={e._id}
                        onClick={() => fetchLecture(e._id)}
                        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                          lecture._id === e._id ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="font-bold mr-2">{i + 1}.</span>
                          <span>{e.title}</span>
                          {progress[0] && progress[0].completedLectures.includes(e._id) && (
                            <span className="ml-2 text-green-500">
                              <TiTick className="text-xl" />
                            </span>
                          )}
                        </div>
                        {user && user.role === "admin" && (
                          <button
                            onClick={(event) => { event.stopPropagation(); deleteHandler(e._id); }}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No Lectures Yet!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;