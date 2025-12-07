import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import Container from "../../components/Shared/Container";

const fetchClubs = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_LOCALHOST}/club`);
  return data;
};

const Clubs = () => {
  const {
    data: clubs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clubs"],
    queryFn: fetchClubs,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return <div className="text-center py-10">Something went wrong</div>;

  return (
    <Container>
      <div className=" py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">All Clubs</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="border rounded-lg shadow p-4 flex flex-col"
            >
              <img
                src={club.bannerImage || "https://via.placeholder.com/300x150"}
                alt={club.clubName}
                className="rounded-md mb-3 h-40 w-full object-cover"
              />
              <h2 className="text-xl font-semibold">{club.clubName}</h2>
              <p className="text-sm text-gray-500 mb-2">{club.category}</p>
              <p className="text-gray-700 mb-3 line-clamp-3">
                {club.description}
              </p>
              <Link
                to={`/club/${club._id}`}
                className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Clubs;
