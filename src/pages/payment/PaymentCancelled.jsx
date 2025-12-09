import React from "react";
import { useNavigate } from "react-router";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/member"); // অথবা যেখান থেকে user আসতে পারে
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        Payment Cancelled
      </h1>
      <p className="text-gray-700 mb-6">
        Your payment was not completed. You can try joining the club again.
      </p>
      <button
        onClick={handleBack}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default PaymentCancelled;
