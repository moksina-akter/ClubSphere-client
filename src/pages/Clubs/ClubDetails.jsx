import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import Container from "../../components/Shared/Container";

const fetchClubById = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_LOCALHOST}/club/${id}`
  );
  return data;
};

const ClubDetails = () => {
  const { id } = useParams();
  const {
    data: club,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: () => fetchClubById(id),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Something went wrong</p>
      </div>
    );

  if (!club)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Club not found</p>
      </div>
    );

  return (
    <Container>
      <div className=" py-12 px-4">
        <div className="flex flex-col md:flex-row md:gap-10 items-start">
          {/* 1️⃣ Image */}
          <div className="md:w-1/2 mb-6 md:mb-0 rounded-lg overflow-hidden shadow-lg">
            <img
              src={club.bannerImage || "https://via.placeholder.com/600x400"}
              alt={club.clubName}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          {/* 2️⃣ Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {club.clubName}
              </h1>
              <p className="text-gray-500 mb-4">
                {club.category} | {club.location}
              </p>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                About Club
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {club.description}
              </p>
            </div>

            {/* 3️⃣ Membership */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Membership
              </h2>
              <button
                className={`px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300 ${
                  club.membershipFee > 0
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {club.membershipFee > 0
                  ? `Join Club ($${club.membershipFee})`
                  : "Join Club (Free)"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClubDetails;
