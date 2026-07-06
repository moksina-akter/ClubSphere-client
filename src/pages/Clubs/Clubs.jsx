import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import { useState } from "react";

const Clubs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const {
    data: clubs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clubs", search, category, sort],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_LOCALHOST}/club`, {
        params: { search, category, sort },
      });
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
        <h1 className="text-3xl font-bold mb-8 text-[#FF6A1C] text-center">
          All Clubs
        </h1>

        {/* --- Search, Filter & Sort Section --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-blue-50 p-6 rounded-xl shadow-sm">
          {/* Search by Name */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by club name..."
              className="input input-bordered w-full border-blue-300 focus:border-blue-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter by Category */}
          <div className="w-full md:w-1/4">
            <select
              className="select select-bordered w-full border-blue-300"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Sports">Sports</option>
              <option value="Cultural">Cultural</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Sorting Option */}
          <div className="w-full md:w-1/4">
            <select
              className="select select-bordered w-full border-blue-300"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highestFee">Highest Fee</option>
              <option value="lowestFee">Lowest Fee</option>
            </select>
          </div>
        </div>

        {/* --- Club Cards Grid --- */}
        {clubs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-medium">
              No clubs found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {clubs.map((club) => (
              <div
                key={club._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition flex flex-col"
              >
                <img
                  src={club.bannerImage || "/placeholder.jpg"}
                  alt={club.clubName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2">
                    {club.clubName}
                  </h2>
                  <span className="bg-blue-100 text-[rgb(220,84,11)] text-xs font-bold px-2 py-1 rounded w-fit mb-2">
                    {club.category}
                  </span>
                  <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                    {club.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="font-bold text-lg text-[#FF6A1C]">
                      {club.membershipFee > 0
                        ? `$${club.membershipFee}`
                        : "Free"}
                    </p>
                    <Link
                      to={`/club/${club._id}`}
                      className="bg-[#FF6A1C] text-white px-4 py-2 rounded-lg hover:bg-[rgb(220,84,11)] transition shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Clubs;
