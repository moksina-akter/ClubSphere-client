// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Link } from "react-router";
// import { motion } from "framer-motion";
// import Container from "../../components/Shared/Container";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";

// export default function Event() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");

//   const {
//     data: events = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["events", search, category],
//     queryFn: async () => {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_LOCALHOST}/events`,
//         {
//           params: { search, category },
//         },
//       );
//       return data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;
//   if (isError)
//     return (
//       <p className="text-center text-red-500 mt-10">Error loading events.</p>
//     );

//   return (
//     <Container>
//       <h1 className="text-3xl font-bold p-5 mt-5 text-[#FF6A1C] text-center">
//         All Events
//       </h1>

//       {/* --- Search & Filter Section --- */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8 px-6 items-center justify-center">
//         {/* Search Input */}
//         <div className="w-full md:w-1/3">
//           <input
//             type="text"
//             placeholder="Search by event title..."
//             className="input input-bordered w-full border-blue-300 focus:outline-blue-500"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Category Dropdown */}
//         <div className="w-full md:w-1/4">
//           <select
//             className="select select-bordered w-full border-blue-300 focus:outline-blue-500"
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             <option value="Sports">Sports</option>
//             <option value="Cultural">Cultural</option>
//             <option value="Science">Science</option>
//             <option value="Technology">Technology</option>
//             <option value="Business">Business</option>
//           </select>
//         </div>
//       </div>

//       {/* --- Events Grid --- */}
//       {events.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-gray-500 text-lg">
//             No events found matching your search.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//           {events.map((event) => (
//             <motion.div
//               key={event._id}
//               className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-2xl transition-all flex flex-col justify-between"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{ scale: 1.02 }}
//             >
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-2">
//                   {event.title}
//                 </h2>
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-xs font-semibold bg-blue-100 text-[#FF6A1C] px-2 py-1 rounded-full uppercase">
//                     {event.category || "General"}
//                   </span>
//                   <p className="text-xs text-gray-400">
//                     {new Date(event.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                   {event.description}
//                 </p>
//                 <div className="space-y-1">
//                   <p className="text-sm font-medium text-gray-700 italic">
//                     Club: <span className="text-[#FF6A1C]">{event.clubId}</span>
//                   </p>
//                   <p className="text-lg font-bold text-green-600">
//                     {event.eventFee > 0 ? `৳${event.eventFee}` : "Free"}
//                   </p>
//                 </div>
//               </div>

//               <Link
//                 to={`/events/${event._id}`}
//                 className="mt-5 block text-center bg-[#FF6A1C] hover:bg-[rgb(220,84,11)] text-white font-semibold py-2 rounded-lg transition"
//               >
//                 View Details
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </Container>
//   );
// }
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import {
  HiOutlineSearch,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineTicket,
  HiOutlineLocationMarker,
  HiOutlineCamera,
  HiOutlineSparkles,
  HiOutlineBookOpen,
  HiOutlineChip,
  HiOutlineHeart,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineVolumeUp,
} from "react-icons/hi";

export default function Event() {
  const [search, setSearch] = useState("");

  // 🎨 টাইটেল/ক্যাটাগরি অনুযায়ী প্রফেশনাল আইকন দেখানোর ফাংশন
  // const getCategoryIcon = (cat) => {
  //   switch (cat) {
  //     case "Photography":
  //       return <HiOutlineCamera className="text-xl text-[#FF6A1C]" />;
  //     case "Adventure":
  //       return <HiOutlineSparkles className="text-xl text-[#FF6A1C]" />;
  //     case "Books":
  //       return <HiOutlineBookOpen className="text-xl text-[#FF6A1C]" />;
  //     case "Technology":
  //       return <HiOutlineChip className="text-xl text-[#FF6A1C]" />;
  //     case "Fitness":
  //       return <HiOutlineHeart className="text-xl text-[#FF6A1C]" />;
  //     case "Music":
  //       return <HiOutlineVolumeUp className="text-xl text-[#FF6A1C]" />;
  //     case "Sports":
  //       return <HiOutlineAcademicCap className="text-xl text-[#FF6A1C]" />;
  //     case "Business":
  //       return <HiOutlineBriefcase className="text-xl text-[#FF6A1C]" />;
  //     default:
  //       return <HiOutlineSparkles className="text-xl text-[#FF6A1C]" />;
  //   }
  // };

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events", search], // 👈 ক্যাটাগরি বাদ দেওয়া হয়েছে
    queryFn: async () => {
      const queryParams = {};
      if (search) queryParams.search = search;

      const { data } = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/events`,
        { params: queryParams },
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-red-500 font-bold bg-red-50 px-6 py-3 rounded-xl border border-red-100 shadow-xs">
          Error loading events. Please try again.
        </p>
      </div>
    );

  return (
    <section className="bg-base-200/40 min-h-screen py-12">
      <Container>
        <div className="px-4">
          {/* হেডার সেকশন */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral">
              Upcoming <span className="text-[#FF6A1C]">Events</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-3 max-w-md mx-auto font-medium">
              Join exciting events, workshops, and sessions hosted by your
              favorite clubs.
            </p>
          </div>

          {/* 🛠️ সার্চ বার সেকশন (ফুল উইডথ করা হয়েছে) */}
          <div className="mb-12 bg-white p-5 rounded-2xl border border-base-300 shadow-xs max-w-2xl mx-auto">
            <div className="relative w-full">
              <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                value={search}
                placeholder="Search by event title..."
                className="input input-bordered w-full pl-10 text-sm font-medium focus:border-[#FF6A1C] focus:outline-hidden"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* --- ইভেন্ট গ্রিড --- */}
          {events.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-base-300 border-dashed max-w-xl mx-auto shadow-xs">
              <p className="text-base text-gray-400 font-bold">
                No events found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  className="card bg-white border border-base-300 shadow-xs rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      {/* ক্যাটাগরি ব্যাজ ও ডেট */}
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="flex items-center gap-1 text-[10px] font-black bg-orange-50 text-[#FF6A1C] px-2.5 py-1 rounded-md uppercase tracking-wider border border-orange-100">
                          {event.category || "General"}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-400 font-semibold">
                          <HiOutlineCalendar className="text-sm text-gray-400" />
                          {new Date(event.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      {/* 💼 টাইটেল ও ডায়নামিক প্রফেশনাল আইকন */}
                      <div className="flex items-start gap-2 mb-2">
                        {/* <div className="mt-0.5 shrink-0">
                          {getCategoryIcon(event.category)}
                        </div> */}
                        <h2 className="text-base font-extrabold text-neutral line-clamp-2 group-hover:text-[#FF6A1C] transition-colors leading-snug">
                          {event.title}
                        </h2>
                      </div>

                      {/* 📍 লোকেশন টেক্সট */}
                      <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-3">
                        <HiOutlineLocationMarker className="text-sm shrink-0 text-gray-500" />
                        <span className="line-clamp-1">
                          {event.location || "Main Campus"}
                        </span>
                      </div>

                      {/* ডেসক্রিপশন */}
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4">
                        {event.description}
                      </p>
                    </div>

                    {/* মেটা ইনফো সেকশন */}
                    <div className="pt-4 border-t border-base-200 space-y-2 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <HiOutlineUserGroup className="text-sm text-gray-400" />
                        <span>
                          Club ID:{" "}
                          <span className="text-neutral font-bold">
                            {event.clubId}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <HiOutlineTicket className="text-xs" /> Ticket Fee
                        </span>
                        <p className="text-base font-black">
                          {event.eventFee > 0 ? (
                            <span className="text-[#FF6A1C]">
                              ৳{event.eventFee}
                            </span>
                          ) : (
                            <span className="text-success uppercase font-bold text-xs bg-green-50 px-2 py-0.5 rounded-sm border border-green-100">
                              Free
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* অরেঞ্জ বাটন অ্যাকশন */}
                  <div className="px-5 pb-5">
                    <Link
                      to={`/events/${event._id}`}
                      className="btn btn-sm w-full bg-[#FF6A1C] hover:bg-[#EE3A19] text-white font-bold text-xs rounded-xl border-none normal-case shadow-xs transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
