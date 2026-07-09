// import { useQuery } from "@tanstack/react-query";
// import { useParams, useNavigate } from "react-router"; // useNavigate ইম্পোর্ট করা হয়েছে
// import axios from "axios";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import JoinClub from "./JoinClub";
// import Container from "../../components/Shared/Container";
// import {
//   HiOutlineBadgeCheck,
//   HiOutlineCollection,
//   HiOutlineCurrencyDollar,
//   HiOutlineArrowLeft, // ব্যাক অ্যারো আইকন
// } from "react-icons/hi";

// const ClubDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate(); // নেভিগেশন হুক ইনিশিয়েট করা হয়েছে

//   const {
//     data: club,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["club", id],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${import.meta.env.VITE_LOCALHOST}/club/${id}`,
//       );
//       return res.data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;
//   if (isError)
//     return (
//       <div className="flex justify-center items-center h-[50vh]">
//         <p className="text-red-500 font-bold bg-red-50 px-6 py-3 rounded-xl border border-red-100 shadow-sm">
//           Failed to load club details.
//         </p>
//       </div>
//     );

//   return (
//     <section className="bg-base-200/40 min-h-screen py-10">
//       <Container>
//         <div className="max-w-2xl mx-auto px-4">
//           {/* ⬅️ ব্যাক বাটন সেকশন */}
//           <button
//             onClick={() => navigate(-1)} // -1 দিলে ঠিক আগের পেজে ব্যাক করবে
//             className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#FF6A1C] transition-colors mb-4 group cursor-pointer"
//           >
//             <HiOutlineArrowLeft className="text-sm group-hover:-translate-x-0.5 transition-transform" />
//             Back to Clubs
//           </button>

//           {/* মেইন প্রিমিয়াম কার্ড */}
//           <div className="bg-white rounded-2xl border border-base-300 shadow-sm overflow-hidden">
//             {/* 📸 ১. ক্লাবের ব্যানার ইমেজ সেকশন */}
//             <div className="relative h-40 md:h-48 w-full bg-base-200">
//               <img
//                 src={club.bannerImage || "/placeholder.jpg"}
//                 alt={club.clubName}
//                 className="w-full h-full object-cover"
//               />
//               <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#FF6A1C] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border border-white/40 shadow-sm">
//                 {club.category}
//               </span>
//             </div>

//             {/* ২. কার্ড বডি কন্টেন্ট */}
//             <div className="p-5 md:p-8">
//               {/* টাইটেল এবং ভেরিফাইড ট্যাগ */}
//               <div className="mb-5 pb-4 border-b border-base-200">
//                 <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-500 uppercase tracking-wider mb-1">
//                   <HiOutlineBadgeCheck className="text-base" />
//                   Official Verified Community
//                 </div>
//                 <h1 className="text-xl md:text-2xl font-black text-neutral leading-tight">
//                   {club.clubName}
//                 </h1>
//               </div>

//               {/* 📊 ৩. ২-কলামের ইনফো গ্রিড */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
//                 {/* ক্যাটাগরি কার্ড */}
//                 <div className="flex items-center gap-3 bg-base-100 p-3 rounded-xl border border-base-300 shadow-2xs">
//                   <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center text-lg shrink-0">
//                     <HiOutlineCollection />
//                   </div>
//                   <div>
//                     <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">
//                       Category
//                     </p>
//                     <p className="text-xs font-bold text-neutral">
//                       {club.category}
//                     </p>
//                   </div>
//                 </div>

//                 {/* মেম্বারশিপ ফি কার্ড */}
//                 <div className="flex items-center gap-3 bg-base-100 p-3 rounded-xl border border-base-300 shadow-2xs">
//                   <div className="w-9 h-9 rounded-lg bg-green-50 text-green-500 flex items-center justify-center text-lg shrink-0">
//                     <HiOutlineCurrencyDollar />
//                   </div>
//                   <div>
//                     <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">
//                       Membership Fee
//                     </p>
//                     <p className="text-xs font-black text-neutral">
//                       {club.membershipFee > 0 ? (
//                         <span className="text-[#FF6A1C]">
//                           ${club.membershipFee}
//                         </span>
//                       ) : (
//                         <span className="text-success font-bold">FREE</span>
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* 📝 ৪. ডেসক্রিপশন সেকশন */}
//               <div className="mb-6">
//                 <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
//                   About The Club
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed text-xs md:text-sm whitespace-pre-line text-justify bg-base-50 p-3.5 rounded-xl border border-base-200">
//                   {club.description}
//                 </p>
//               </div>

//               {/* 🎯 ৫. অ্যাকশন বাটন এরিয়া */}
//               <div className="pt-4 border-t border-base-200 text-center">
//                 <div className="w-full">
//                   <JoinClub club={club} />
//                 </div>
//                 <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">
//                   By joining, you agree to comply with ClubSphere's community
//                   guidelines.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default ClubDetails;
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import JoinClub from "./JoinClub";
import Container from "../../components/Shared/Container";
import {
  HiOutlineBadgeCheck,
  HiOutlineCollection,
  HiOutlineCurrencyDollar,
  HiOutlineArrowLeft,
  HiOutlineLocationMarker, // লোকেশন আইকন ইম্পোর্ট করা হয়েছে
} from "react-icons/hi";

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: club,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/club/${id}`,
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-red-500 font-bold bg-red-50 px-6 py-3 rounded-xl border border-red-100 shadow-sm">
          Failed to load club details.
        </p>
      </div>
    );

  return (
    <section className="bg-base-200/40 min-h-screen py-10">
      <Container>
        <div className="max-w-2xl mx-auto px-4">
          {/* ⬅️ ব্যাক বাটন */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#FF6A1C] transition-colors mb-4 group cursor-pointer"
          >
            <HiOutlineArrowLeft className="text-sm group-hover:-translate-x-0.5 transition-transform" />
            Back to Clubs
          </button>

          {/* মেইন প্রিমিয়াম কার্ড */}
          <div className="bg-white rounded-2xl border border-base-300 shadow-sm overflow-hidden">
            {/* 📸 ১. ক্লাবের ব্যানার ইমেজ */}
            <div className="relative h-40 md:h-48 w-full bg-base-200">
              <img
                src={club.bannerImage || "/placeholder.jpg"}
                alt={club.clubName}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#FF6A1C] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border border-white/40 shadow-sm">
                {club.category}
              </span>
            </div>

            {/* ২. কার্ড বডি কন্টেন্ট */}
            <div className="p-5 md:p-8">
              {/* টাইটেল, ভেরিফাইড ট্যাগ এবং লোকেশন */}
              <div className="mb-5 pb-4 border-b border-base-200">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-500 uppercase tracking-wider mb-1">
                  <HiOutlineBadgeCheck className="text-base" />
                  Official Verified Community
                </div>

                <h1 className="text-xl md:text-2xl font-black text-neutral leading-tight mb-2">
                  {club.clubName}
                </h1>

                {/* 📍 লোকেশন সেকশন (টাইটেলের ঠিক নিচে হালকা করে দেওয়া হলো) */}
                <div className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
                  <HiOutlineLocationMarker className="text-sm text-gray-500" />
                  <span>
                    {club.location || club.address || "Main Campus, Bangladesh"}
                  </span>
                  {/* ডাটায় location বা address না থাকলে ডিফল্ট একটা টেক্সট দেখাবে */}
                </div>
              </div>

              {/* 📊 ৩. ২-কলামের ইনফো গ্রিড */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {/* ক্যাটাগরি কার্ড */}
                <div className="flex items-center gap-3 bg-base-100 p-3 rounded-xl border border-base-300 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center text-lg shrink-0">
                    <HiOutlineCollection />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">
                      Category
                    </p>
                    <p className="text-xs font-bold text-neutral">
                      {club.category}
                    </p>
                  </div>
                </div>

                {/* মেম্বারশিপ ফি কার্ড */}
                <div className="flex items-center gap-3 bg-base-100 p-3 rounded-xl border border-base-300 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-green-50 text-green-500 flex items-center justify-center text-lg shrink-0">
                    <HiOutlineCurrencyDollar />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">
                      Membership Fee
                    </p>
                    <p className="text-xs font-black text-neutral">
                      {club.membershipFee > 0 ? (
                        <span className="text-[#FF6A1C]">
                          ${club.membershipFee}
                        </span>
                      ) : (
                        <span className="text-success font-bold">FREE</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* 📝 ৪. ডেসক্রিপশন সেকশন */}
              <div className="mb-6">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  About The Club
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs md:text-sm whitespace-pre-line text-justify bg-base-50 p-3.5 rounded-xl border border-base-200">
                  {club.description}
                </p>
              </div>

              {/* 🎯 ৫. অ্যাকশন বাটন এরিয়া */}
              <div className="pt-4 border-t border-base-200 text-center">
                <div className="w-full">
                  <JoinClub club={club} />
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">
                  By joining, you agree to comply with ClubSphere's community
                  guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ClubDetails;
