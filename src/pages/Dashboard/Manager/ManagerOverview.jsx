import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { getIdToken } from "firebase/auth";

const ManagerOverview = () => {
  const { user } = useAuth();
  // const user = auth.currentUser;
  // console.log(user.uid); // Login user এর UID
  const { data: overview, isLoading } = useQuery({
    queryKey: ["managerOverview", user?.email],
    queryFn: async () => {
      if (!user) return {};
      const token = await getIdToken(user, true); // ID token পাওয়া
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/manager/overview`,
        {
          params: { email: user.email },
          headers: {
            Authorization: `Bearer ${token}`, // token pathানো
          },
        }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <div className="border p-4 rounded shadow">
        <h2>Total Clubs Managed</h2>
        <p className="text-xl font-bold">{overview?.totalClubs ?? 0}</p>
      </div>
      <div className="border p-4 rounded shadow">
        <h2>Total Members</h2>
        <p className="text-xl font-bold">{overview?.totalMembers ?? 0}</p>
      </div>
      <div className="border p-4 rounded shadow">
        <h2>Total Events</h2>
        <p className="text-xl font-bold">{overview?.totalEvents ?? 0}</p>
      </div>
      <div className="border p-4 rounded shadow">
        <h2>Total Payments</h2>
        <p className="text-xl font-bold">
          ${(overview?.totalPayments ?? 0) / 100}
        </p>
      </div>
    </div>
  );
};

export default ManagerOverview;
