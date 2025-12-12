import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const PendingMembers = () => {
  const { user: adminUser } = useAuth(); // admin token
  const queryClient = useQueryClient();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["pendingMembers"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/admin/pending-members`,
        {
          headers: { Authorization: `Bearer ${adminUser.token}` },
        }
      );
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (uid) =>
      axios.post(
        `${import.meta.env.VITE_LOCALHOST}/admin/approve-manager/${uid}`,
        {},
        { headers: { Authorization: `Bearer ${adminUser.token}` } }
      ),
    onSuccess: () => queryClient.invalidateQueries(["pendingMembers"]),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Pending Members</h1>
      {members.map((m) => (
        <div key={m.uid} className="flex justify-between p-2 border mb-2">
          <span>
            {m.name} ({m.email})
          </span>
          <button
            className="bg-green-500 text-white px-2 rounded"
            onClick={() => approveMutation.mutate(m.uid)}
          >
            Approve as Manager
          </button>
        </div>
      ))}
    </div>
  );
};

export default PendingMembers;
