// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { motion } from "framer-motion";
// import Container from "../../components/Shared/Container";
// import { Link } from "react-router";

// const fetchFeaturedClubs = async () => {
//   const { data } = await axios.get(
//     `${import.meta.env.VITE_LOCALHOST}/featured-clubs`,
//   );
//   return data;
// };

// const FeaturedClubs = () => {
//   const { data: clubs = [], isLoading } = useQuery({
//     queryKey: ["featuredClubs"],
//     queryFn: fetchFeaturedClubs,
//   });

//   if (isLoading) {
//     return (
//       <div className="text-center py-10 text-[#FF6A1C]">
//         Loading Featured Clubs...
//       </div>
//     );
//   }

//   return (
//     <div className="px-5 py-16">
//       <Container>
//         <motion.h2
//           className="text-sm md:text-4xl font-bold text-center text-[#FF6A1C] mb-10"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           Featured Clubs
//         </motion.h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {clubs.map((club, idx) => (
//             <motion.div
//               key={club._id}
//               className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.1 }}
//             >
//               <img
//                 src={club.bannerImage || "/placeholder.jpg"}
//                 alt={club.clubName}
//                 className="h-40 w-full object-cover"
//               />
//               <div className="p-5">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {club.clubName}
//                 </h3>
//                 <p className="text-sm mt-1 text-gray-500">{club.category}</p>
//                 <p className="text-sm text-gray-500">{club.location}</p>
//                 <Link
//                   to={`/club/${club._id}`}
//                   className="mt-4 inline-block w-full text-center py-2 bg-[#FF6A1C] text-white rounded-lg hover:bg-[rgb(220,84,11)] transition"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default FeaturedClubs;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import { Link } from "react-router";

const fetchFeaturedClubs = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_LOCALHOST}/featured-clubs`,
  );
  return data;
};

const FeaturedClubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: fetchFeaturedClubs,
  });

  // মডার্ন স্কেলিটন লোডিং স্টেট (DaisyUI)
  if (isLoading) {
    return (
      <div className="px-5 py-16">
        <Container>
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-44 w-full rounded-xl"></div>
                <div className="skeleton h-6 w-3/5"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-10 w-full rounded-lg"></div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="px-5 py-20 bg-gradient-to-b from-transparent to-orange-50/20">
      <Container>
        {/* উন্নত সেকশন হেডার */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-black text-neutral tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Explore <span className="text-[#FF6A1C]">Featured Clubs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm md:text-base mt-2 max-w-md mx-auto"
          >
            Handpicked popular communities with active members and exciting
            events.
          </motion.p>
        </div>

        {/* কার্ড গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, idx) => (
            <motion.div
              key={club._id}
              className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden hover:shadow-[0_10px_30px_rgba(255,106,28,0.12)] transition-all duration-300 group flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* ইমেজ, ক্যাটাগরি এবং মেম্বার ব্যাজ */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={club.bannerImage || "/placeholder.jpg"}
                  alt={club.clubName}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* ক্যাটাগরি ব্যাজ */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {club.category}
                </span>
                {/* মেম্বার কাউন্টার ব্যাজ (ডাইনামিক বা ফলব্যাক ৫0+) */}
                <span className="absolute bottom-4 right-4 bg-[#FF6A1C] text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                  👥 {club.memberCount || "50+"} Members
                </span>
              </div>

              {/* কার্ড বডি কন্টেন্ট */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#FF6A1C] transition-colors line-clamp-1">
                    {club.clubName}
                  </h3>

                  {/* আইকন সহ লোকেশন সেকশন */}
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{club.location}</span>
                  </div>

                  {/* শর্ট ডেসক্রিপশন (যদি ব্যাকএন্ডে থাকে, নাহলে সুন্দর প্লেসহোল্ডার) */}
                  <p className="text-sm text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                    {club.description ||
                      "Join this community to collaborate, share ideas, and participate in exciting team activities."}
                  </p>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="mt-6">
                  <Link
                    to={`/club/${club._id}`}
                    className="inline-flex items-center justify-center w-full py-3 bg-[#FF6A1C] hover:bg-[#EE3A19] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedClubs;
