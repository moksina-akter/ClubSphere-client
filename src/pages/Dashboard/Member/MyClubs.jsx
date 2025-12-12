import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const MyClubs = () => {
  const { user } = useAuth();

  const { data: memberships } = useQuery({
    queryKey: ["memberships", user?.email],
    queryFn: async () => {
      const token = await user.getIdToken(); // 🔥 Firebase token
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/member/my-clubs`,
        {
          params: { email: user.email },
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 Send token
          },
        }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (!memberships) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {memberships.map((m) => (
        <div key={m._id} className=" p-4 bg-white rounded shadow">
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
