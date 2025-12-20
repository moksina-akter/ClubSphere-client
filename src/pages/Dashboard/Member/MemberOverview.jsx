import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MemberOverview = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: overview,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["memberOverview", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-overview?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load overview</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome{" "}
        <span className="text-blue-800">
          {user?.displayName || user?.email}
        </span>
      </h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-4 rounded shadow">
          <h2>Total Clubs Joined</h2>
          <p className="font-bold text-xl">{overview?.totalClubsJoined || 0}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2>Total Events Registered</h2>
          <p className="font-bold text-xl">
            {overview?.totalEventsRegistered || 0}
          </p>
        </div>

        <div className=" bg-white p-4 rounded shadow">
          <h2 className="mb-2">Upcoming Events</h2>
          {overview?.upcomingEvents?.length ? (
            overview.upcomingEvents.map((event) => (
              <div key={event._id} className="border p-2 rounded mb-2">
                <p className="font-semibold">{event.eventTitle}</p>
                {/* <p>{event.clubName}</p> */}
                <p>{new Date(event.eventDate).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No upcoming events</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
