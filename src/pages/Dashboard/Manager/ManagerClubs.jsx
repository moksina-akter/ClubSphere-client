import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ManagerClubs = () => {
  const { firebaseUser } = useAuth();
  const queryClient = useQueryClient();
  const [editingClubId, setEditingClubId] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["managerClubs"],
    enabled: !!firebaseUser,
    queryFn: async () => {
      const token = await firebaseUser.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/manager/my-clubs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
  });

  const createClubMutation = useMutation({
    mutationFn: async (data) => {
      const token = await firebaseUser.getIdToken();
      const res = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/manager/create-club`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["managerClubs"]);
      queryClient.invalidateQueries(["clubs"]);
      queryClient.invalidateQueries(["featuredClubs"]);
      reset();
    },
  });

  const updateClubMutation = useMutation({
    mutationFn: async ({ clubId, data }) => {
      const token = await firebaseUser.getIdToken();
      const res = await axios.put(
        `${import.meta.env.VITE_LOCALHOST}/manager/my-clubs/${clubId}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["managerClubs"]);
      queryClient.invalidateQueries(["clubs"]);
      queryClient.invalidateQueries(["featuredClubs"]);
      setEditingClubId(null);
      reset();
    },
  });

  const deleteClubMutation = useMutation({
    mutationFn: async (clubId) => {
      const token = await firebaseUser.getIdToken();
      const res = await axios.delete(
        `${import.meta.env.VITE_LOCALHOST}/manager/my-clubs/${clubId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["managerClubs"]);
      queryClient.invalidateQueries(["clubs"]);
      queryClient.invalidateQueries(["featuredClubs"]);
    },
  });

  const onSubmit = (data) => {
    if (editingClubId) {
      updateClubMutation.mutate({ clubId: editingClubId, data });
    } else {
      createClubMutation.mutate(data);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Clubs</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow mb-8"
      >
        <h2 className="text-xl font-semibold mb-3">
          {editingClubId ? "Edit Club" : "Create New Club"}
        </h2>

        {editingClubId && (
          <p className="text-orange-600 mb-3">✏️ You are editing a club</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("clubName", { required: true })}
            placeholder="Club Name"
            className="border p-2 rounded"
          />

          <input
            {...register("location", { required: true })}
            placeholder="Location"
            className="border p-2 rounded"
          />

          <input
            {...register("category")}
            placeholder="Category (Photography, Tech...)"
            className="border p-2 rounded"
          />

          <input
            type="number"
            {...register("membershipFee")}
            placeholder="Membership Fee (0 = Free)"
            className="border p-2 rounded"
          />

          <input
            {...register("bannerImage")}
            placeholder="Banner Image URL"
            className="border p-2 rounded col-span-full"
          />

          <textarea
            {...register("description")}
            placeholder="Description"
            className="border p-2 rounded col-span-full"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingClubId ? "Update Club" : "Create Club"}
          </button>

          {editingClubId && (
            <button
              type="button"
              onClick={() => {
                setEditingClubId(null);
                reset();
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded ml-3"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white rounded shadow overflow-hidden flex flex-col"
          >
            {club.bannerImage ? (
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="h-40 w-full object-cover"
              />
            ) : (
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold">{club.clubName}</h3>
              <p className="text-sm"> {club.location}</p>
              <p className="text-sm">Category: {club.category || "-"}</p>

              <p
                className={`text-sm font-medium mt-1 ${
                  club.status === "approved"
                    ? "text-green-600"
                    : club.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {club.status}
              </p>

              <p className="text-sm mt-1 flex-1">
                {club.description || "No description"}
              </p>

              <p className="font-semibold mt-2">
                Fee: ${club.membershipFee || 0}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingClubId(club._id);
                    reset({
                      clubName: club.clubName,
                      location: club.location,
                      description: club.description,
                      membershipFee: club.membershipFee,
                      bannerImage: club.bannerImage,
                      category: club.category,
                    });
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this club?")) {
                      deleteClubMutation.mutate(club._id);
                    }
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerClubs;
