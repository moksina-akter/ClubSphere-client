import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import JoinClub from "./JoinClub";

const ClubDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const {
    data: club,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/club/${id}`
      );
      // console.log(club);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load club details.
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={club.bannerImage || "/placeholder.jpg"}
          alt={club.clubName}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{club.clubName}</h1>
          <p className="text-gray-600 mb-2">{club.category}</p>
          <p className="text-gray-700 mb-4">{club.description}</p>

          <p className="mb-4 font-medium">
            Membership Fee:{" "}
            {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
          </p>

          {/* Join Button Component */}
          <JoinClub club={club} />
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
