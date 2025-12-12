import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
const Clubs = () => {
  const {
    data: clubs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clubs"], // array
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_LOCALHOST}/club`);
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load clubs.</p>
    );

  return (
    <Container>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">
          All Clubs
        </h1>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={club.bannerImage || "/placeholder.jpg"}
                alt={club.clubName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{club.clubName}</h2>
                <p className="text-gray-600 mb-2">{club.category}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {club.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-medium">
                    {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
                  </p>
                  <Link
                    to={`/club/${club._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Clubs;
