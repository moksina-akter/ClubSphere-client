import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyEvents = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myEvents", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/member/my-events?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load events</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Events</h1>

      {events.length === 0 ? (
        <p>No events registered</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event._id} className=" p-4 rounded shadow bg-white">
              <h2 className="font-semibold text-lg">{event.eventTitle}</h2>
              <p>Club: {event.clubName}</p>
              <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
              <p>Status: {event.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
