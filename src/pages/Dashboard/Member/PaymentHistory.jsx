import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();

  const { data: payments } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/member/payments`,
        {
          params: { email: user.email },
        }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (!payments) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Club</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">${p.amount / 100}</td>
              <td className="border p-2">{p.type}</td>
              <td className="border p-2">{p.clubName}</td>
              <td className="border p-2">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
