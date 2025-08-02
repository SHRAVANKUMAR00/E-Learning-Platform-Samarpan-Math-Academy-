import React from "react";
import Sidebar from "./Sidebar";
// import "./common.css"; // REMOVE THIS LINE

const Layout = ({ children }) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;