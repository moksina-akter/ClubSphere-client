// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const PaymentHistory = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: payments = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["paymentHistory", user?.email],
//     enabled: !!user?.email && !loading,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/member/payments?email=${user.email}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Failed to load payment history</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Payment History</h1>

//       {payments.length === 0 ? (
//         <p>No payment records found</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th>#</th>
//                 <th>Amount</th>
//                 <th>Type</th>
//                 <th>Club</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.map((pay, idx) => (
//                 <tr key={pay._id}>
//                   <td>{idx + 1}</td>
//                   <td>${pay.amount}</td>
//                   <td className="capitalize">{pay.type}</td>
//                   <td>{pay.clubName || "—"}</td>
//                   <td>{new Date(pay.createdAt).toLocaleDateString()}</td>
//                   <td className="capitalize">{pay.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentHistory;
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load payment history</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payment records found</p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded shadow">
          <table className="table-auto w-full text-left">
            <thead className="bg-blue-50 ">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Club/Event</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, idx) => (
                <tr
                  key={pay._id}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">${pay.amount}</td>
                  <td className="px-4 py-2 capitalize">{pay.type}</td>
                  <td className="px-4 py-2">{pay.clubName || "—"}</td>
                  <td className="px-4 py-2">
                    {new Date(pay.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 capitalize">{pay.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
