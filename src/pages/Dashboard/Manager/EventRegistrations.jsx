// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";
// import toast from "react-hot-toast";

// const EventRegistrations = () => {
//   const { user } = useAuth();
//   const queryClient = useQueryClient();

//   const {
//     data: registrations = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["eventRegistrations", user?.email],
//     queryFn: async () => {
//       if (!user) return [];
//       const token = await user.getIdToken(); // get Firebase ID token
//       const res = await axios.get(
//         `${import.meta.env.VITE_LOCALHOST}/manager/event-registrations`,
//         {
//           params: { email: user.email },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   // Update registration status mutation
//   const updateStatusMutation = useMutation({
//     mutationFn: async ({ registrationId, status }) =>
//       axios.put(
//         `${
//           import.meta.env.VITE_LOCALHOST
//         }/manager/event-registrations/${registrationId}`,
//         { status }
//       ),
//     onSuccess: () => {
//       toast.success("Status updated successfully");
//       queryClient.invalidateQueries(["eventRegistrations", user?.email]);
//     },
//     onError: () => toast.error("Failed to update status"),
//   });

//   if (!user) return <p>Please log in to view registrations.</p>;
//   if (isLoading) return <p>Loading registrations...</p>;
//   if (isError) return <p>Error fetching registrations: {error.message}</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Event Registrations</h1>

//       {registrations.length === 0 ? (
//         <p>No registrations found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border">Event</th>
//                 <th className="p-2 border">Member Email</th>
//                 <th className="p-2 border">Status</th>
//                 <th className="p-2 border">Registered At</th>
//                 <th className="p-2 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {registrations?.map((reg) => (
//                 <tr key={reg._id} className="border-b">
//                   <td className="p-2 border">{reg.eventTitle}</td>
//                   <td className="p-2 border">{reg.userEmail}</td>
//                   <td className="p-2 border">{reg.status}</td>
//                   <td className="p-2 border">
//                     {new Date(reg.registeredAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-2 border space-x-2">
//                     {reg.status !== "cancelled" && (
//                       <button
//                         onClick={() =>
//                           updateStatusMutation.mutate({
//                             registrationId: reg._id,
//                             status: "cancelled",
//                           })
//                         }
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                     {reg.status !== "attended" && (
//                       <button
//                         onClick={() =>
//                           updateStatusMutation.mutate({
//                             registrationId: reg._id,
//                             status: "attended",
//                           })
//                         }
//                         className="bg-green-500 text-white px-2 py-1 rounded"
//                       >
//                         Mark Attended
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventRegistrations;
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const EventRegistrations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: registrations = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["eventRegistrations", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];

      const res = await axiosSecure.get("/event-registrations", {
        params: { email: user.email },
      });

      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ registrationId, status }) => {
      return axiosSecure.put(`/manager/event-registrations/${registrationId}`, {
        status,
      });
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries(["eventRegistrations", user?.email]);
    },
    onError: () => toast.error("Failed to update status"),
  });

  if (!user) return <p>Please log in to view registrations.</p>;
  if (isLoading) return <p>Loading registrations...</p>;
  if (isError) return <p>Error fetching registrations: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Event Registrations</h1>

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Event</th>
                <th className="p-2 border">Member Email</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Registered At</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg._id} className="border-b">
                  <td className="p-2 border">{reg.eventTitle}</td>
                  <td className="p-2 border">{reg.userEmail}</td>
                  <td className="p-2 border">{reg.status}</td>
                  <td className="p-2 border">
                    {new Date(reg.registeredAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 border space-x-2">
                    {reg.status !== "cancelled" && (
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            registrationId: reg._id,
                            status: "cancelled",
                          })
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    )}
                    {reg.status !== "attended" && (
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            registrationId: reg._id,
                            status: "attended",
                          })
                        }
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Mark Attended
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;
