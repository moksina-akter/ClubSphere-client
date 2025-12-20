// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// // import { useAuth } from "../../../hooks/useAuth";
// import Spinner from "../../../components/Shared/LoadingSpinner";
// import { toast } from "react-hot-toast";
// import useAuth from "../../../hooks/useAuth";

// const ManagerOverview = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user, loading } = useAuth();

//   if (loading) return <Spinner />; // wait until user loaded

//   if (!user || user.role !== "clubManager") {
//     return (
//       <p className="text-red-500 font-bold text-lg">
//         Access Denied. Only Club Managers can view this page.
//       </p>
//     );
//   }

//   const {
//     data: overview,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["managerOverview", user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/manager/overview");
//       return res.data;
//     },
//     enabled: !!user.email,
//     retry: 1,
//   });

//   if (isLoading) return <Spinner />;

//   if (isError) {
//     toast.error("Failed to load manager overview!");
//     return (
//       <p className="text-red-500 font-bold text-center mt-10">
//         Error loading data: {error.message}
//       </p>
//     );
//   }

//   const statCards = [
//     { title: "Total Clubs Managed", value: overview.totalClubs },
//     { title: "Total Members", value: overview.totalMembers },
//     { title: "Total Events", value: overview.totalEvents },
//     {
//       title: "Total Payments",
//       value: `$${(overview.totalPayments / 100).toLocaleString()}`,
//     },
//   ];

//   return (
//     <div className="p-6 md:p-10">
//       <h2 className="text-3xl font-bold mb-6">Manager Overview</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {statCards.map((card) => (
//           <motion.div
//             key={card.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-xl transition-shadow"
//           >
//             <h4 className="text-lg font-medium text-gray-500">{card.title}</h4>
//             <p className="mt-2 text-2xl font-bold text-gray-800">
//               {card.value}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManagerOverview;

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { getAuth } from "firebase/auth";
// import Spinner from "../../../components/Shared/LoadingSpinner"; // loading spinner
// import useAuth from "../../../hooks/useAuth";

// const ManagerOverview = () => {
//   const { user, loading } = useAuth();
//   const auth = getAuth();
//   const currentUser = auth.currentUser;

//   if (loading) return <Spinner />; // wait until user loaded

//   if (!user || user.role !== "clubManager") {
//     return (
//       <p className="text-red-500 font-bold text-lg">
//         Access Denied. Only Club Managers can view this page.
//       </p>
//     );
//   }

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["managerOverview", user.email],
//     queryFn: async () => {
//       if (!currentUser) return {};
//       const token = await currentUser.getIdToken(true); // Firebase ID token
//       const res = await axios.get(
//         `${import.meta.env.VITE_LOCALHOST}/manager/overview`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Manager Overview API response:", res.data); // debug
//       return res.data;
//     },
//     enabled: !!user.email && !!currentUser,
//     retry: 1,
//   });

//   if (isLoading) return <Spinner />;
//   if (isError)
//     return (
//       <p className="text-red-500 font-bold mt-10">
//         Error loading data: {error.message}
//       </p>
//     );

//   const stats = [
//     { title: "Total Clubs", value: data.totalClubs },
//     { title: "Total Members", value: data.totalMembers },
//     { title: "Total Events", value: data.totalEvents },
//     {
//       title: "Total Payments",
//       value: `$${(data.totalPayments / 100).toLocaleString()}`,
//     },
//   ];

//   return (
//     <div className="p-6 md:p-10">
//       <h2 className="text-3xl font-bold mb-6">Manager Overview</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div
//             key={stat.title}
//             className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-xl transition-shadow"
//           >
//             <h4 className="text-lg font-medium text-gray-500">{stat.title}</h4>
//             <p className="mt-2 text-2xl font-bold text-gray-800">
//               {stat.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManagerOverview;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Shared/LoadingSpinner";

const ManagerOverview = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  if (loading) return <Spinner />;

  if (!user || user.role !== "clubManager") {
    return (
      <p className="text-red-500 font-bold text-lg">
        Access Denied. Only Club Managers can view this page.
      </p>
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["managerOverview", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/overview");
      console.log("Manager Overview API response:", res.data); // server থেকে response
      return res.data;
    },
    retry: 1,
    enabled: !!user.email,
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-red-500 font-bold text-center mt-10">
        Error loading data: {error.message}
      </p>
    );

  const statCards = [
    { title: "Total Clubs Managed", value: data.totalClubs },
    { title: "Total Members", value: data.totalMembers },
    { title: "Total Events", value: data.totalEvents },
    {
      title: "Total Payments",
      value: `$${(data.totalPayments / 100).toLocaleString()}`,
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-6">Manager Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-xl transition-shadow"
          >
            <h4 className="text-lg font-medium text-gray-500">{card.title}</h4>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerOverview;
