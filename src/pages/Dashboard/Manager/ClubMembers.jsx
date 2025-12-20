import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ClubMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: members = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clubMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_LOCALHOST}/manager/members`
      );
      return res.data;
    },
  });

  const approveMember = useMutation({
    mutationFn: async (memberId) => {
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_LOCALHOST}/members/approve/${memberId}`
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["clubMembers"]),
  });

  const removeMember = useMutation({
    mutationFn: async (memberId) => {
      const res = await axiosSecure.delete(
        `${import.meta.env.VITE_LOCALHOST}/members/${memberId}`
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["clubMembers"]),
  });

  if (isLoading) return <p>Loading members...</p>;
  if (error) return <p>Error loading members: {error.message}</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Club Members</h2>
      {members.length === 0 ? (
        <p>No members yet.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Member Email</th>
              <th className="border px-4 py-2">Club</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Joined At</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m._id}>
                <td className="border px-4 py-2">{m.userEmail}</td>
                <td className="border px-4 py-2">{m.clubName}</td>
                <td className="border px-4 py-2">{m.status}</td>
                <td className="border px-4 py-2">
                  {new Date(m.joinedAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {m.status !== "active" && (
                    <button
                      onClick={() => approveMember.mutate(m._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => removeMember.mutate(m._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClubMembers;
