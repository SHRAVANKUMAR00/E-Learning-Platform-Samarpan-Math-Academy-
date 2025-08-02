import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt, FaPlus } from "react-icons/fa"; // Added FaPlus icon
import { UserData } from "../../context/UserContext";

const Sidebar = () => {
  const { user } = UserData();
  const location = useLocation();

  const navLinks = [
    { to: "/admin/dashboard", icon: AiFillHome, text: "Home", role: "all" },
    { to: "/admin/course", icon: FaBook, text: "Courses", role: "all" },
    { to: "/admin/course/add", icon: FaPlus, text: "Add Course", role: "all" }, // NEW: Link to Add Course page
    { to: "/admin/users", icon: FaUserAlt, text: "Users", role: "superadmin" },
  ];

  const getLinkClasses = (path) => {
    const baseClasses = "flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200";
    const activeClasses = "bg-purple-600 text-white shadow-md";
    const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";
    return `${baseClasses} ${location.pathname === path ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="bg-gray-800 text-white w-64 lg:w-72 p-4 flex flex-col min-h-screen transition-all duration-300">
      <div className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((link, index) => {
            if (link.role === "superadmin" && user && user.mainrole !== "superadmin") {
              return null;
            }
            return (
              <li key={index}>
                <Link to={link.to} className={getLinkClasses(link.to)}>
                  <div className="text-xl">
                    <link.icon />
                  </div>
                  <span className="font-medium text-lg">{link.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-t border-gray-700 pt-4 mt-auto">
        <Link to={"/account"} className={getLinkClasses("/account")}>
          <div className="text-xl">
            <AiOutlineLogout />
          </div>
          <span className="font-medium text-lg">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;