// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useParams, useNavigate } from "react-router";
// import axios from "axios";
// import toast from "react-hot-toast";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import useAuth from "../../hooks/useAuth";

// const ClubDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // Fetch club details
//   const {
//     data: club,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["club", id],
//     queryFn: async () => {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/club/${id}`);
//       return res.data;
//     },
//   });

//   // Join club mutation
//   const joinMutation = useMutation({
//     mutationFn: async () => {
//       if (!user || !token) throw new Error("Please login to join this club");

//       const res = await axios.post(
//         `${import.meta.env.VITE_LOCALHOST}/member/join`,
//         { clubId: id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       return res.data;
//     },
//     onSuccess: (data) => {
//       if (data.url) {
//         // Paid membership
//         window.location.href = data.url;
//       } else {
//         toast.success("You joined the club successfully!");
//         navigate("/dashboard/member");
//       }
//     },
//     onError: (err) => {
//       toast.error(
//         err.response?.data?.message || err.message || "Failed to join club"
//       );
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;
//   if (isError)
//     return (
//       <p className="text-red-500 text-center mt-10">
//         Failed to load club details.
//       </p>
//     );

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
//         <img
//           src={club.bannerImage || "/placeholder.jpg"}
//           alt={club.clubName}
//           className="w-full h-64 object-cover"
//         />
//         <div className="p-6">
//           <h1 className="text-3xl font-bold mb-4">{club.clubName}</h1>
//           <p className="text-gray-600 mb-2">{club.category}</p>
//           <p className="text-gray-700 mb-4">{club.description}</p>
//           <p className="mb-4 font-medium">
//             Membership Fee:{" "}
//             {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
//           </p>
//           <button
//             onClick={() => joinMutation.mutate()}
//             disabled={joinMutation.isLoading}
//             className={`px-6 py-2 rounded text-white font-medium transition ${
//               club.membershipFee > 0
//                 ? "bg-green-600 hover:bg-green-700"
//                 : "bg-blue-600 hover:bg-blue-700"
//             } ${joinMutation.isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {joinMutation.isLoading
//               ? "Processing..."
//               : club.membershipFee > 0
//               ? `Pay $${club.membershipFee} & Join`
//               : "Join Free"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClubDetails;

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import JoinClub from "./JoinClub";

const ClubDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const {
    data: club,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/club/${id}`
      );
      // console.log(club);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load club details.
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={club.bannerImage || "/placeholder.jpg"}
          alt={club.clubName}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{club.clubName}</h1>
          <p className="text-gray-600 mb-2">{club.category}</p>
          <p className="text-gray-700 mb-4">{club.description}</p>

          <p className="mb-4 font-medium">
            Membership Fee:{" "}
            {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
          </p>

          {/* Join Button Component */}
          <JoinClub club={club} />
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
