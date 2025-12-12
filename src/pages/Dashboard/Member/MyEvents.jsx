// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";

// const MyEvents = () => {
//   const { user } = useAuth();

//   const { data: events, isLoading } = useQuery({
//     queryKey: ["myEvents", user?.email],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${import.meta.env.VITE_LOCALHOST}/member/my-events`,
//         {
//           params: { email: user.email },
//         }
//       );
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (!events?.length) return <p>No events registered yet.</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//       {events.map((e) => (
//         <div key={e._id} className="border p-4 rounded shadow">
//           <h2 className="font-bold">{e.eventTitle}</h2>
//           <p>Club: {e.clubName}</p>
//           <p>Date: {new Date(e.eventDate).toLocaleDateString()}</p>
//           <p>Status: {e.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyEvents;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MyEvents = () => {
  const { user } = useAuth();

  const { data: events, isLoading } = useQuery({
    queryKey: ["myEvents", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/member/my-events`,
        { params: { email: user.email } }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!events?.length) return <p>No events registered yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {events.map((e) => (
        <div key={e._id} className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">{e.eventTitle}</h2>
          <p>Club: {e.clubName}</p>
          <p>Date: {new Date(e.eventDate).toLocaleDateString()}</p>
          <p>Status: {e.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyEvents;
