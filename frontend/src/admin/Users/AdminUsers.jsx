import React, { useEffect, useState } from "react";
// import "./users.css"; // REMOVE THIS LINE
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.mainrole !== "superadmin") return navigate("/");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (confirm("Are you sure you want to update this user role?")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }
  
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            All Users
          </h1>
          <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                <tr>
                  <th scope="col" className="px-6 py-3">#</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((e, i) => (
                    <tr key={e._id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{i + 1}</td>
                      <td className="px-6 py-4">{e.name}</td>
                      <td className="px-6 py-4">{e.email}</td>
                      <td className="px-6 py-4">{e.role}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => updateRole(e._id)}
                          className="bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 hover:bg-purple-700 text-sm"
                        >
                          Update Role
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;