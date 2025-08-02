import React from "react";
// import "./paymentsuccess.css"; // REMOVE THIS LINE
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Import a success icon

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  
  return (
    <div className="bg-gray-100 min-h-[75vh] flex items-center justify-center p-4">
      {user && (
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-sm w-full text-center transform transition-transform duration-300 hover:scale-105">
          {/* Success Icon */}
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />

          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-lg text-gray-600 mb-4">Your course subscription has been activated.</p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 mb-1">Payment Reference No:</p>
            <p className="text-md font-bold text-purple-600 font-mono break-all">{params.id}</p>
          </div>

          <Link 
            to={`/${user._id}/dashboard`} 
            className="inline-block w-full bg-purple-600 text-white py-3 rounded-full font-bold transition-colors duration-300 hover:bg-purple-700 shadow-md"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;