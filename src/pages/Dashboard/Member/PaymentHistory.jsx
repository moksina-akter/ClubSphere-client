import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();

  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/member/payments`,
        { params: { email: user.email } }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading payments...</p>;
  if (isError) return <p>Error loading payments.</p>;
  if (!payments?.length) return <p>No payments found.</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Club / Event</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="p-2 border">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                ${p.amount ? (p.amount / 100).toFixed(2) : "0.00"}
              </td>
              <td className="p-2 border">{p.type}</td>
              <td className="p-2 border">
                {p.clubName || p.eventTitle || "-"}
              </td>
              <td className="p-2 border">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
