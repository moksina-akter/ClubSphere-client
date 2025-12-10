import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MemberOverview = () => {
  const { user } = useAuth();

  const { data: overview } = useQuery({
    queryKey: ["memberOverview", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/member-overview`,
        {
          params: { email: user.email },
        }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (!overview) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome, {user?.displayName || user?.email}
      </h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border p-4 rounded shadow">
          <h2>Total Clubs Joined</h2>
          <p>{overview.totalClubsJoined}</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h2>Total Events Registered</h2>
          <p>{overview.totalEventsRegistered}</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h2>Upcoming Events</h2>
          <p>{overview.upcomingEvents.length}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
