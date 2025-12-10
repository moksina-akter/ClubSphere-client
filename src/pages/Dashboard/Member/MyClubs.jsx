import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const MyClubs = () => {
  const { user } = useAuth();

  const { data: memberships, isLoading } = useQuery({
    queryKey: ["myClubs", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/member/my-clubs`,
        {
          params: { email: user.email },
        }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!memberships?.length) return <p>No clubs joined yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {memberships.map((m) => (
        <div key={m._id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{m.clubName}</h2>
          <p>Location: {m.location}</p>
          <p>Status: {m.status}</p>
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
