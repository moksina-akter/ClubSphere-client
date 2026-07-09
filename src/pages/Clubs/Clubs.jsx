// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import axios from "axios";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import Container from "../../components/Shared/Container";
// import { useState } from "react";

// const Clubs = () => {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [sort, setSort] = useState("");

//   const {
//     data: clubs = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["clubs", search, category, sort],
//     queryFn: async () => {
//       const res = await axios.get(`${import.meta.env.VITE_LOCALHOST}/club`, {
//         params: { search, category, sort },
//       });
//       return res.data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;
//   if (isError)
//     return (
//       <div className="flex justify-center items-center h-[50vh]">
//         <p className="text-red-500 font-semibold bg-red-50 px-6 py-3 rounded-xl border border-red-100">
//           Failed to load clubs.
//         </p>
//       </div>
//     );

//   return (
//     <section className="bg-base-200/50 min-h-screen py-12">
//       <Container>
//         <div className="px-4">
//           {/* Section Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral">
//               All <span className="text-[#FF6A1C]">Clubs</span>
//             </h1>
//             <p className="text-gray-500 text-sm md:text-base mt-2">
//               Discover and join active communities tailored to your passion.
//             </p>
//           </div>

//           {/* 🛠 সার্চ, ফিল্টার ও সর্ট সেকশন (ডিজাইন মডার্ন কিন্তু সেফ) */}
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10 bg-base-100 p-5 rounded-2xl border border-base-300 shadow-sm">
//             {/* Search Input */}
//             <div className="md:col-span-6">
//               <input
//                 type="text"
//                 placeholder="Search by club name..."
//                 className="input input-bordered w-full text-sm font-medium focus:border-[#FF6A1C]"
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>

//             {/* Filter Input */}
//             <div className="md:col-span-3">
//               <select
//                 className="select select-bordered w-full text-sm font-medium cursor-pointer"
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">All Categories</option>
//                 <option value="Photography">Photography</option>
//                 <option value="Adventure">Adventure</option>
//                 <option value="Books">Books</option>
//                 <option value="Technology">Technology</option>
//                 <option value="Culinary">Culinary</option>
//                 <option value="Fitness">Fitness</option>
//                 <option value="Music">Music</option>
//                 <option value="Games">Games</option>
//               </select>
//             </div>

//             {/* Sort Input */}
//             <div className="md:col-span-3">
//               <select
//                 className="select select-bordered w-full text-sm font-medium cursor-pointer"
//                 onChange={(e) => setSort(e.target.value)}
//               >
//                 <option value="">Sort By</option>
//                 <option value="newest">Newest First</option>
//                 <option value="oldest">Oldest First</option>
//                 <option value="highestFee">Highest Fee</option>
//                 <option value="lowestFee">Lowest Fee</option>
//               </select>
//             </div>
//           </div>

//           {/* --- Club Cards Grid --- */}
//           {clubs.length === 0 ? (
//             <div className="text-center py-20 bg-base-100 rounded-2xl border border-base-300 border-dashed">
//               <p className="text-lg text-gray-400 font-medium">
//                 No clubs found matching your criteria.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {clubs.map((club) => (
//                 <div
//                   key={club._id}
//                   className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full"
//                 >
//                   {/* Banner Image & Category Tag */}
//                   <figure className="relative h-40 overflow-hidden bg-base-200">
//                     <img
//                       src={club.bannerImage || "/placeholder.jpg"}
//                       alt={club.clubName}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                     <span className="absolute top-3 left-3 bg-base-100 text-neutral text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-base-300">
//                       {club.category}
//                     </span>
//                   </figure>

//                   {/* Card Content */}
//                   <div className="card-body p-5 flex flex-col flex-grow justify-between">
//                     <div>
//                       <h2 className="card-title text-lg font-bold text-neutral line-clamp-1 group-hover:text-[#FF6A1C] transition-colors">
//                         {club.clubName}
//                       </h2>
//                       <p className="text-gray-500 text-xs mt-2 line-clamp-3 leading-relaxed">
//                         {club.description ||
//                           "No description available for this club community."}
//                       </p>
//                     </div>

//                     {/* Bottom Info & Button */}
//                     <div className="flex items-center justify-between mt-5 pt-4 border-t border-base-200">
//                       <div className="flex flex-col">
//                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
//                           Fee
//                         </span>
//                         <p className="font-extrabold text-base text-neutral">
//                           {club.membershipFee > 0 ? (
//                             <span className="text-[#FF6A1C]">
//                               ${club.membershipFee}
//                             </span>
//                           ) : (
//                             <span className="text-success font-bold">Free</span>
//                           )}
//                         </p>
//                       </div>

//                       <Link
//                         to={`/club/${club._id}`}
//                         className="btn btn-sm bg-[#FF6A1C] hover:bg-[#EE3A19] text-white font-bold text-xs rounded-xl border-none px-4 normal-case"
//                       >
//                         Details
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default Clubs;

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi"; // 📍 লোকেশন আইকন ইম্পোর্ট করা হয়েছে

const Clubs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");

  const {
    data: clubs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clubs", search, category, location, sort],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_LOCALHOST}/club`, {
        params: { search, category, location, sort },
      });
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-red-500 font-semibold bg-red-50 px-6 py-3 rounded-xl border border-red-100">
          Failed to load clubs.
        </p>
      </div>
    );

  return (
    <section className="bg-base-200/50 min-h-screen py-12">
      <Container>
        <div className="px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral">
              All <span className="text-[#FF6A1C]">Clubs</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              Discover and join active communities tailored to your passion.
            </p>
          </div>

          {/* 🛠 সার্চ, ফিল্টার ও সর্ট সেকশন */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 mb-10 bg-base-100 p-5 rounded-2xl border border-base-300 shadow-sm">
            {/* Search Input */}
            <div className="md:col-span-4">
              <input
                type="text"
                placeholder="Search by club name..."
                className="input input-bordered w-full text-sm font-medium focus:border-[#FF6A1C]"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                className="select select-bordered w-full text-sm font-medium cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Photography">Photography</option>
                <option value="Adventure">Adventure</option>
                <option value="Books">Books</option>
                <option value="Technology">Technology</option>
                <option value="Culinary">Culinary</option>
                <option value="Fitness">Fitness</option>
                <option value="Music">Music</option>
                <option value="Games">Games</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="md:col-span-3">
              <select
                className="select select-bordered w-full text-sm font-medium cursor-pointer"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Online">Online / Remote</option>
              </select>
            </div>

            {/* Sort Input */}
            <div className="md:col-span-2">
              <select
                className="select select-bordered w-full text-sm font-medium cursor-pointer"
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
            <div className="text-center py-20 bg-base-100 rounded-2xl border border-base-300 border-dashed">
              <p className="text-lg text-gray-400 font-medium">
                No clubs found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clubs.map((club) => (
                <div
                  key={club._id}
                  className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full"
                >
                  {/* Banner Image & Category Tag */}
                  <figure className="relative h-40 overflow-hidden bg-base-200">
                    <img
                      src={club.bannerImage || "/placeholder.jpg"}
                      alt={club.clubName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-base-100 text-neutral text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-base-300">
                      {club.category}
                    </span>
                  </figure>

                  {/* Card Content */}
                  <div className="card-body p-5 flex flex-col flex-grow justify-between gap-4">
                    <div>
                      {/* Title */}
                      <h2 className="card-title text-lg font-bold text-neutral line-clamp-1 group-hover:text-[#FF6A1C] transition-colors">
                        {club.clubName}
                      </h2>

                      {/* 📍 🆕 লোকেশন টেক্সট (টাইটেলের ঠিক নিচে এবং ডেসক্রিপশনের ওপরে) */}
                      <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mt-1.5 mb-2">
                        <HiOutlineLocationMarker className="text-sm shrink-0 text-gray-500" />
                        <span className="line-clamp-1">
                          {club.location || "Main Campus"}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">
                        {club.description ||
                          "No description available for this club community."}
                      </p>
                    </div>

                    {/* Bottom Info & Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-base-200 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          Fee
                        </span>
                        <p className="font-extrabold text-base text-neutral">
                          {club.membershipFee > 0 ? (
                            <span className="text-[#FF6A1C]">
                              ${club.membershipFee}
                            </span>
                          ) : (
                            <span className="text-success font-bold">Free</span>
                          )}
                        </p>
                      </div>

                      <Link
                        to={`/club/${club._id}`}
                        className="btn btn-sm bg-[#FF6A1C] hover:bg-[#EE3A19] text-white font-bold text-xs rounded-xl border-none px-4 normal-case"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Clubs;
