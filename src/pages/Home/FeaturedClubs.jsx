import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const fetchFeaturedClubs = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_LOCALHOST}/featured-clubs`
  );
  return data;
};

const FeaturedClubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: fetchFeaturedClubs,
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-blue-600">
        Loading Featured Clubs...
      </div>
    );
  }

  return (
    <div className=" px-5 py-16">
      <Container>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Featured Clubs
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, idx) => (
            <motion.div
              key={club._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="h-40 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {club.clubName}
                </h3>
                <p className="text-sm mt-1 text-gray-500">{club.category}</p>
                <p className="text-sm text-gray-500">{club.location}</p>

                <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedClubs;
