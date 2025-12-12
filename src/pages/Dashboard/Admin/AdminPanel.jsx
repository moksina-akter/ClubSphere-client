import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AdminPanel = () => {
  const { user: adminUser } = useAuth(); // admin token
  const queryClient = useQueryClient();

  // Fetch pending members
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["pendingMembers"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/admin/pending-members`,
        { headers: { Authorization: `Bearer ${adminUser.token}` } }
      );
      return res.data;
    },
    enabled: !!adminUser?.token,
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (uid) =>
      axios.post(
        `${import.meta.env.VITE_LOCALHOST}/admin/approve-manager/${uid}`,
        {},
        { headers: { Authorization: `Bearer ${adminUser.token}` } }
      ),
    onSuccess: () => queryClient.invalidateQueries(["pendingMembers"]),
  });

  if (isLoading) return <p>Loading pending members...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Pending Members</h1>
      {members.length === 0 ? (
        <p>No pending members found.</p>
      ) : (
        <div className="space-y-2">
          {members.map((m) => (
            <div
              key={m.uid}
              className="flex justify-between items-center border p-3 rounded shadow"
            >
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-gray-600">{m.email}</p>
              </div>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => approveMutation.mutate(m.uid)}
              >
                Approve as Manager
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
