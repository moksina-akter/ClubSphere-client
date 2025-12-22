import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const ViewPayments = () => {
  const { firebaseUser } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      if (!firebaseUser) {
        setLoading(false);
        return;
      }
      try {
        const token = await firebaseUser.getIdToken(true);
        const res = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/admin/payments`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPayments(res.data);
      } catch (err) {
        console.error("Fetch payments error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [firebaseUser]);

  // Handle sorting
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Filter & sort payments
  const displayedPayments = payments
    .filter((p) => p.userEmail.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortKey === "createdAt") {
        return sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-full md:w-1/3"
        />
      </div>

      {displayedPayments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("userEmail")}
                >
                  Email
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  Amount
                </th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Club / Event</th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Date
                </th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedPayments.map((p) => (
                <tr key={p._id}>
                  <td className="border p-2">{p.userEmail}</td>
                  <td className="border p-2">
                    {(p.amount / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "usd",
                    })}
                  </td>
                  <td className="border p-2">{p.type || "N/A"}</td>
                  <td className="border p-2">
                    {p.clubName || p.eventName || "N/A"}
                  </td>
                  <td className="border p-2">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{p.status || "Completed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewPayments;
