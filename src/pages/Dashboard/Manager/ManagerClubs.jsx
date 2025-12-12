import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const ManagerClubs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [newClubName, setNewClubName] = useState("");
  const [newLocation, setNewLocation] = useState("");

  // Fetch clubs managed by this manager
  const { data: clubs, isLoading } = useQuery({
    queryKey: ["managerClubs", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/manager/my-clubs`,
        { params: { email: user.email } }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Create new club
  const createClubMutation = useMutation({
    mutationFn: async (newClub) =>
      axios.post(
        `${import.meta.env.VITE_LOCALHOST}/manager/create-club`,
        newClub
      ),
    onSuccess: () => queryClient.invalidateQueries(["managerClubs"]),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Clubs</h1>

      <div className="mb-6 border p-4 rounded shadow">
        <h2 className="font-medium mb-2">Add New Club</h2>
        <input
          type="text"
          placeholder="Club Name"
          value={newClubName}
          onChange={(e) => setNewClubName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={() =>
            createClubMutation.mutate({
              clubName: newClubName,
              location: newLocation,
              managerEmail: user.email,
            })
          }
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Club
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clubs.map((club) => (
          <div key={club._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{club.clubName}</h3>
            <p>Location: {club.location}</p>
            <p>Status: {club.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerClubs;
