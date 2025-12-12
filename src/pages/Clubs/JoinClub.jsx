// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import { getAuth } from "firebase/auth";

// const JoinClub = ({ club }) => {
//   const navigate = useNavigate();

//   const joinMutation = useMutation({
//     mutationFn: async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;

//       if (!user) throw new Error("User not authenticated");

//       // Get fresh token, force refresh if expired
//       const token = await user.getIdToken(true);

//       const res = await axios.post(
//         `${import.meta.env.VITE_LOCALHOST}/member/join`,
//         { clubId: club._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       return res.data;
//     },
//     onSuccess: (data) => {
//       if (data.url) {
//         // Paid membership redirect
//         window.location.href = data.url;
//       } else if (data.success) {
//         toast.success("You have joined the club!");
//         navigate("/dashboard/member");
//       }
//     },
//     onError: (err) => {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Failed to join club");
//     },
//   });

//   return (
//     <button
//       onClick={() => joinMutation.mutate()}
//       className={`px-6 py-3 rounded-lg text-white font-medium ${
//         club.membershipFee > 0
//           ? "bg-green-600 hover:bg-green-700"
//           : "bg-blue-600 hover:bg-blue-700"
//       }`}
//     >
//       {club.membershipFee > 0
//         ? `Pay $${club.membershipFee} & Join`
//         : "Join Free"}
//     </button>
//   );
// };

// export default JoinClub;

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";

const JoinClub = ({ club }) => {
  const navigate = useNavigate();

  const joinMutation = useMutation({
    mutationFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("Please login to join the club");
      // Always get fresh token
      const token = await user.getIdToken(true);

      const res = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/member/join`,
        { clubId: club._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    },

    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url; // For paid membership
      } else {
        toast.success("You have joined the club!");
        navigate("/dashboard/member");
      }
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to join club");
    },
  });

  return (
    <button
      onClick={() => joinMutation.mutate()}
      disabled={joinMutation.isLoading}
      className={`px-6 py-3 rounded-lg text-white font-medium ${
        club.membershipFee > 0
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      } ${joinMutation.isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {joinMutation.isLoading
        ? "Processing..."
        : club.membershipFee > 0
        ? `Pay $${club.membershipFee} & Join`
        : "Join Free"}
    </button>
  );
};

export default JoinClub;
