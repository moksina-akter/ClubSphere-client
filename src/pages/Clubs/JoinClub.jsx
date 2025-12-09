// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

// const JoinClub = ({ club }) => {
//   const createCheckoutSession = useMutation({
//     mutationFn: async () => {
//       const res = await axios.post(
//         `${import.meta.env.VITE_LOCALHOST}/create-checkout-session`,
//         {
//           clubId: club._id,
//           clubName: club.clubName,
//           membershipFee: club.membershipFee,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       return res.data;
//     },
//   });

//   const handleJoin = async () => {
//     try {
//       const { url } = await createCheckoutSession.mutateAsync();
//       window.location.href = url; // Redirect to Stripe checkout
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <button onClick={handleJoin} className="btn btn-primary">
//       {club.membershipFee > 0
//         ? `Pay $${club.membershipFee} & Join`
//         : "Join Free"}
//     </button>
//   );
// };

// export default JoinClub;
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

const JoinClub = ({ club }) => {
  const navigate = useNavigate();

  const createCheckoutSession = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/create-checkout-session`,
        {
          clubId: club._id,
          clubName: club.clubName,
          membershipFee: club.membershipFee,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
  });

  const joinFreeClub = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/join-free-club`,
        { clubId: club._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        alert("You have joined the club for free!");
        navigate("/dashboard/member"); // Redirect to member dashboard
      } else {
        alert("Something went wrong while joining the club.");
      }
    },
  });

  const handleJoin = async () => {
    if (club.membershipFee > 0) {
      try {
        const { url } = await createCheckoutSession.mutateAsync();
        window.location.href = url; // Redirect to Stripe checkout
      } catch (err) {
        console.error(err);
      }
    } else {
      joinFreeClub.mutate();
    }
  };

  return (
    <button
      onClick={handleJoin}
      className={`px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300 ${
        club.membershipFee > 0
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {club.membershipFee > 0
        ? `Pay $${club.membershipFee} & Join`
        : "Join Free"}
    </button>
  );
};

export default JoinClub;
