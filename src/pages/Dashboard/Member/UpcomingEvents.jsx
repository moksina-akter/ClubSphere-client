import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const UpcomingEvents = () => {
  const { user } = useAuth();

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["upcomingEvents", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/member/upcoming-events`,
        { params: { email: user.email } }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading upcoming events...</p>;
  if (isError) return <p>Error fetching events.</p>;
  if (!events?.length) return <p>No upcoming events.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map((event) => (
        <div key={event._id} className="border p-4 rounded shadow">
          <h2 className="font-bold text-lg">{event.title}</h2>
          <p>Club: {event.clubName}</p>
          <p>Date: {new Date(event.eventDate).toLocaleString()}</p>
          <p>Location: {event.location}</p>
          <p>{event.isPaid ? `Fee: $${event.eventFee}` : "Free"}</p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
