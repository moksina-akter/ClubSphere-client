import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/overview");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">
        Error loading stats. Please try again later.
      </p>
    );

  const statCards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Total Clubs", value: stats.totalClubs },
    { title: "Pending Clubs", value: stats.pendingClubs },
    { title: "Approved Clubs", value: stats.approvedClubs },
    { title: "Rejected Clubs", value: stats.rejectedClubs },
    { title: "Total Events", value: stats.totalEvents },
    { title: "Total Members", value: stats.totalMembers },
    {
      title: "Total Payments",
      value: `$${(stats.totalPayments / 100).toLocaleString()}`,
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-6">Admin Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-xl transition-shadow"
          >
            <h4 className="text-lg font-medium text-gray-500">{card.title}</h4>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
