import { useSearchParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EventPaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    axios
      .post(`${import.meta.env.VITE_LOCALHOST}/events/verify-payment`, {
        sessionId,
      })
      .then(() => toast.success("Payment successful! Event joined 🎉"))
      .catch(() => toast.error("Payment verification failed"));
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>
    </div>
  );
};

export default EventPaymentSuccess;
