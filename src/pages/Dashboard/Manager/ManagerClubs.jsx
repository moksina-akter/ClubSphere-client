import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ManagerClubs = () => {
  const { firebaseUser } = useAuth(); // Firebase auth
  const queryClient = useQueryClient();
  const [editingClubId, setEditingClubId] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // ============================
  // Fetch manager's clubs
  // ============================
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["managerClubs"],
    queryFn: async () => {
      if (!firebaseUser) return [];
      const token = await firebaseUser.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/manager/my-clubs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: !!firebaseUser,
  });

  // ============================
  // Create club
  // ============================
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
      reset();
    },
  });

  // ============================
  // Update club
  // ============================
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
      setEditingClubId(null);
      reset();
    },
  });

  // ============================
  // Delete club
  // ============================
  const deleteClubMutation = useMutation({
    mutationFn: async (clubId) => {
      const token = await firebaseUser.getIdToken();
      const res = await axios.delete(
        `${import.meta.env.VITE_LOCALHOST}/manager/my-clubs/${clubId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["managerClubs"]),
  });

  // ============================
  // Form submit handler
  // ============================
  const onSubmit = (data) => {
    if (editingClubId) {
      updateClubMutation.mutate({ clubId: editingClubId, data });
    } else {
      createClubMutation.mutate(data);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Clubs</h1>

      {/* Form: Create / Edit Club */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6  p-4 rounded shadow bg-white"
      >
        <h2 className="font-medium mb-2">
          {editingClubId ? "Edit Club" : "Add New Club"}
        </h2>
        <input
          {...register("clubName", { required: true })}
          placeholder="Club Name"
          className="border border-gray-300 rounded p-2 mr-2 mb-2 w-full md:w-auto"
        />
        <input
          {...register("location", { required: true })}
          placeholder="Location"
          className="border border-gray-300 rounded  p-2 mr-2 mb-2 w-full md:w-auto"
        />
        <input
          {...register("description")}
          placeholder="Description"
          className="border border-gray-300 rounded  p-2 mr-2 mb-2 w-full md:w-auto"
        />
        <input
          type="number"
          {...register("membershipFee")}
          placeholder="Membership Fee"
          className="border border-gray-300 rounded  p-2 mr-2 mb-2 w-full md:w-auto"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          {editingClubId ? "Update Club" : "Create Club"}
        </button>
      </form>

      {/* Display manager's clubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <div key={club._id} className=" p-4 rounded shadow bg-white">
            <h3 className="font-bold">{club.clubName}</h3>
            <p>Location: {club.location}</p>
            <p>Status: {club.status}</p>
            <p>Description: {club.description || "-"}</p>
            <p>Membership Fee:${club.membershipFee || 0}</p>

            <div className="mt-2">
              <button
                onClick={() => {
                  setEditingClubId(club._id);
                  reset({
                    clubName: club.clubName,
                    location: club.location,
                    description: club.description,
                    membershipFee: club.membershipFee,
                  });
                }}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
              >
                Edit
              </button>

              <button
                onClick={() => deleteClubMutation.mutate(club._id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerClubs;
