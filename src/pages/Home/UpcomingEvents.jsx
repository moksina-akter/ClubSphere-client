// import React from "react";

// const UpcomingEvents = () => {
//   const events = [
//     {
//       id: 1,
//       title: "Photography Workshop 2026",
//       club: "LensCraft Club",
//       date: "July 25, 2026",
//       time: "4:00 PM",
//       location: "Dhaka",
//       image:
//         "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
//     },
//     {
//       id: 2,
//       title: "National Tech Fest",
//       club: "ByteForce Developers",
//       date: "August 02, 2026",
//       time: "10:00 AM",
//       location: "Sylhet",
//       image:
//         "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
//     },
//     {
//       id: 3,
//       title: "Annual Football Tournament",
//       club: "Strikers FC",
//       date: "August 10, 2026",
//       time: "3:30 PM",
//       location: "Chittagong",
//       image:
//         "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop",
//     },
//   ];

//   return (
//     <section className="py-16 bg-base-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Title */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-neutral">
//             Upcoming <span className="text-orange-500">Events</span>
//           </h2>
//           <p className="text-gray-500 mt-2 max-w-md mx-auto">
//             Don't miss out! Join the most happening events organized by your
//             favorite clubs.
//           </p>
//         </div>

//         {/* Events Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 group"
//             >
//               {/* Image & Date Badge */}
//               <figure className="relative h-48 overflow-hidden">
//                 <img
//                   src={event.image}
//                   alt={event.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
//                   {event.date}
//                 </div>
//               </figure>

//               {/* Card Body */}
//               <div className="card-body p-6">
//                 <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
//                   {event.club}
//                 </span>
//                 <h3 className="card-title text-xl font-bold text-neutral mt-1 group-hover:text-orange-500 transition-colors">
//                   {event.title}
//                 </h3>

//                 {/* Event Details */}
//                 <div className="flex flex-col gap-2 mt-4 text-sm text-gray-500">
//                   <div className="flex items-center gap-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     <span>{event.time}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     <span>{event.location}</span>
//                   </div>
//                 </div>

//                 {/* Action Button */}
//                 <div className="card-actions justify-end mt-6">
//                   <button className="btn bg-orange-500 hover:bg-orange-600 text-white w-full border-none">
//                     Join Event
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UpcomingEvents;
import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react"; // আইকনগুলো আরও ক্লিন করার জন্য lucide-react ব্যবহার করা হয়েছে

const UpcomingEvents = () => {
  // ডেমো ডেটাতে আরেকটি ইভেন্ট যোগ করা হলো যাতে ৪ কলামের গ্রিডটি সুন্দরভাবে পূর্ণ হয়
  const events = [
    {
      id: 1,
      title: "Photography Workshop 2026",
      club: "LensCraft Club",
      date: "July 25, 2026",
      time: "4:00 PM",
      location: "Dhaka",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "National Tech Fest",
      club: "ByteForce Developers",
      date: "August 02, 2026",
      time: "10:00 AM",
      location: "Sylhet",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Annual Football Tournament",
      club: "Strikers FC",
      date: "August 10, 2026",
      time: "3:30 PM",
      location: "Chittagong",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Art & Sketch Exhibition",
      club: "Creative Canvas",
      date: "August 18, 2026",
      time: "11:00 AM",
      location: "Khulna",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight"
          >
            Upcoming <span className="text-[#FF6A1C]">Events</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-2 max-w-md mx-auto text-sm md:text-base"
          >
            Don't miss out! Join the most happening events organized by your
            favorite clubs.
          </motion.p>
        </div>

        {/* 🚀 ৪-কলাম ইভেন্টস গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full"
            >
              {/* Image & Date Badge */}
              <div className="relative h-40 overflow-hidden bg-slate-100">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* গ্লোয়িং ডেট ব্যাজ */}
                <div className="absolute top-3 left-3 bg-[#FF6A1C] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md">
                  {event.date}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#FF6A1C] uppercase tracking-wider block">
                    {event.club}
                  </span>
                  {/* line-clamp-2 ব্যবহার করা হয়েছে যাতে বড় টাইটেল লেআউট ভেঙে না ফেলে */}
                  <h3 className="text-base font-bold text-slate-800 mt-1 line-clamp-2 leading-snug group-hover:text-[#FF6A1C] transition-colors">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="flex flex-col gap-1.5 mt-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-5">
                  <button className="w-full py-2.5 bg-slate-50 hover:bg-[#FF6A1C] text-slate-700 hover:text-white font-semibold text-xs rounded-xl border border-slate-200 hover:border-[#FF6A1C] transition-all duration-300 shadow-sm">
                    Join Event
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
