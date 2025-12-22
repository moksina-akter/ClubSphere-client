import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // ✅ secure axios
import { Link } from "react-router";

const MyClubs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // ✅ custom secure axios instance

  const {
    data: memberships,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memberships", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get("/member/my-clubs", {
        params: { email: user.email }, // backend এ query
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading your clubs...</p>;
  if (error) return <p>Error fetching clubs: {error.message}</p>;
  if (!memberships || memberships.length === 0)
    return <p>No club registered yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {memberships.map((m) => (
        <div key={m._id} className="p-4 bg-white rounded shadow">
          <h2 className="font-bold">{m.clubName}</h2>
          <p>Location: {m.location}</p>
          <p>Status: {m.status}</p>
          <p>Membership Fee: ${m.membershipFee}</p>
          {m.expiryDate && (
            <p>Expiry Date: {new Date(m.expiryDate).toLocaleDateString()}</p>
          )}
          <Link
            to={`/club/${m.clubId}`}
            className="text-blue-500 mt-2 inline-block"
          >
            View Club Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyClubs;
