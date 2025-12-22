import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId || calledRef.current) return;

    calledRef.current = true;

    axiosSecure
      .post(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        if (res.data.success) {
          toast.success("Payment successful  Membership activated");
        } else {
          toast("Already processed");
        }
        navigate("/dashboard/member/my-clubs");
      })
      .catch(() => {
        toast.error("Payment verification failed");
      });
  }, [searchParams, axiosSecure, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-medium">Verifying payment...</p>
    </div>
  );
};

export default PaymentSuccess;
