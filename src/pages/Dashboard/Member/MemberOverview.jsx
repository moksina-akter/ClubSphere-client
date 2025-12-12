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
        { params: { email: user.email } }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (!overview) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome,{" "}
        <span className="text-blue-800 font-bold">
          {user?.displayName || user?.email}
        </span>
      </h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Clubs Joined */}
        <div className="border border-blue-600 bg-white p-4 rounded shadow">
          <h2 className="font-medium">Total Clubs Joined</h2>
          <p className="text-xl font-bold">{overview.totalClubsJoined}</p>
        </div>

        {/* Total Events Registered */}
        <div className="border border-blue-600 bg-white p-4 rounded shadow">
          <h2 className="font-medium">Total Events Registered</h2>
          <p className="text-xl font-bold">{overview.totalEventsRegistered}</p>
        </div>

        {/* Upcoming Events */}
        <div className="border border-blue-600 bg-white p-4 rounded shadow ">
          <h2 className="font-medium mb-2">Upcoming Events</h2>
          {overview.upcomingEvents.length === 0 ? (
            <p>No upcoming events</p>
          ) : (
            <ul className="space-y-2 border-blue-600 bg-white">
              {overview.upcomingEvents.map((event) => (
                <li key={event._id} className="border p-2 rounded">
                  <p className="font-bold">{event.eventTitle}</p>
                  <p>Club: {event.clubName}</p>
                  <p>Date: {new Date(event.eventDate).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
