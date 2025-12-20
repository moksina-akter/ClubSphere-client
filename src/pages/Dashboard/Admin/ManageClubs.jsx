import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const ManageClubs = () => {
  const { firebaseUser } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest / oldest

  // 🔥 Fetch clubs (admin only)
  const fetchClubs = async () => {
    if (!firebaseUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const token = await firebaseUser.getIdToken(true); // force refresh
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/admin/clubs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let data = res.data;

      // Search filter
      if (search) {
        data = data.filter((club) =>
          club.clubName.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Sorting
      data.sort((a, b) => {
        if (sortOrder === "newest")
          return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortOrder === "oldest")
          return new Date(a.createdAt) - new Date(b.createdAt);
        return 0;
      });

      setClubs(data);
    } catch (err) {
      console.error("Fetch clubs error:", err);
      setError("Failed to fetch clubs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, [firebaseUser, search, sortOrder]);

  // 🔄 Update club status
  const updateStatus = async (id, status) => {
    if (!firebaseUser) return;

    try {
      setLoading(true);
      const token = await firebaseUser.getIdToken(true);
      await axios.patch(
        `${import.meta.env.VITE_LOCALHOST}/admin/clubs/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchClubs();
    } catch (err) {
      console.error("Update status error:", err);
      setError("Failed to update club status. Try again.");
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Clubs</h2>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by club name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {clubs.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No clubs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border table-auto">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border p-2">Club Name</th>
                <th className="border p-2">Manager Email</th>
                <th className="border p-2">Membership Fee</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {clubs.map((club) => (
                <tr key={club._id}>
                  <td className="border p-2">{club.clubName}</td>
                  <td className="border p-2">{club.managerEmail}</td>
                  <td className="border p-2">{club.membershipFee}</td>
                  <td className="border p-2">{club.status}</td>
                  <td className="border p-2">
                    {new Date(club.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => updateStatus(club._id, "approved")}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(club._id, "rejected")}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
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

export default ManageClubs;
