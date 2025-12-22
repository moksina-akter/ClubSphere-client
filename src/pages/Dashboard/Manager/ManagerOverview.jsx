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
      // console.log("Manager Overview API response:", res.data); // server থেকে response
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
