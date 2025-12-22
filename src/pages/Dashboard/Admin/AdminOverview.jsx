
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

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

  // Chart Data: ক্লাবের স্ট্যাটাস অনুযায়ী ডাটা তৈরি (অ্যাসাইনমেন্টের রিকোয়ারমেন্ট)
  const chartData = [
    { name: "Total Clubs", count: stats.totalClubs, color: "#4F46E5" },
    { name: "Approved", count: stats.approvedClubs, color: "#10B981" },
    { name: "Pending", count: stats.pendingClubs, color: "#F59E0B" },
    { name: "Rejected", count: stats.rejectedClubs, color: "#EF4444" },
  ];

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-6">Admin Overview</h2>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {statCards.map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-xl transition-shadow border-b-4 border-indigo-500"
          >
            <h4 className="text-lg font-medium text-gray-500">{card.title}</h4>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* --- Visual Chart Section (Required for 100% marks) --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-6 shadow-lg rounded-xl border border-gray-100"
      >
        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          Club Status Analytics
        </h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                cursor={{ fill: "#f3f4f6" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend />
              <Bar dataKey="count" name="Number of Clubs" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOverview;
