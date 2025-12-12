// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router";
// import axios from "axios";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const session_id = searchParams.get("session_id");
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const res = await axios.patch(
//           `${
//             import.meta.env.VITE_LOCALHOST
//           }/payment-success?session_id=${session_id}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (res.data.success)
//           setMessage("Payment Successful! Membership Activated.");
//         else setMessage("Payment failed or already processed.");
//       } catch (err) {
//         console.error(err);
//         setMessage("Something went wrong.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (session_id) verifyPayment();
//   }, [session_id]);

//   if (loading) return <p>Verifying payment...</p>;

//   return <div>{message}</div>;
// };

// export default PaymentSuccess;

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const session_id = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (session_id) {
          // Paid membership: verify Stripe session
          const res = await axios.post(
            `${
              import.meta.env.VITE_LOCALHOST
            }/payment-success?session_id=${session_id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (res.data.success)
            setMessage("Payment Successful! Membership Activated.");
          else setMessage("Payment failed or already processed.");
        } else {
          // Free membership: create directly
          const res = await axios.post(
            `${import.meta.env.VITE_LOCALHOST}/join-free-club`,
            {}, // clubId & user info backend will fetch from token/session
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (res.data.success)
            setMessage("You have joined the club for free!");
          else setMessage("Something went wrong while joining the club.");
        }

        // 2 সেকেন্ড পরে auto-redirect to dashboard
        setTimeout(() => {
          navigate("/dashboard/member");
        }, 2000);
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [session_id, navigate]);

  if (loading) return <p>Processing your membership...</p>;

  return (
    <div className="flex justify-center items-center h-screen text-center">
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default PaymentSuccess;
