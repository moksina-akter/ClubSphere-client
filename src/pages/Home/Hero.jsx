// import { motion } from "framer-motion";
// import { Link } from "react-router";

// const Hero = () => {
//   return (
//     <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 gap-10 mt-10">
//       {/* Text Section */}
//       <motion.div
//         initial={{ opacity: 0, x: -60 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="flex-1"
//       >
//         <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
//           Discover Local Clubs & Exciting Events
//         </h1>

//         <p className="text-gray-600 mt-4 text-lg max-w-md">
//           Join vibrant communities, attend amazing events, and explore new
//           passions — all in one place.
//         </p>

//         <div className="mt-6 flex gap-4">
//           <Link
//             to="/clubs"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
//           >
//             Join a Club
//           </Link>

//           <Link
//             to="/dashboard/manager/create-club"
//             className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
//           >
//             Create a Club
//           </Link>
//         </div>
//       </motion.div>

//       {/* Image Section */}
//       <motion.div
//         initial={{ opacity: 0, x: 60 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="flex-1 flex justify-center"
//       >
//         <img
//           src="https://i.ibb.co/qC0dypF/community.png"
//           alt="hero"
//           className="w-full max-w-md drop-shadow-xl"
//         />
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;
//-------------------------------------------
// import { motion } from "framer-motion";
// import { Link } from "react-router";

// const Hero = () => {
//   return (
//     <section
//       className="h-[85vh] w-full bg-cover bg-center relative flex items-center"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
//       }}
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-60"></div>

//       <div className="relative z-10 px-6 md:px-16 lg:px-24">
//         {/* Animation */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9 }}
//           className="max-w-2xl"
//         >
//           <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
//             Discover Clubs.
//             <br />
//             Connect with People.
//             <br />
//             Join the Community.
//           </h1>

//           <p className="text-gray-200 mt-4 text-lg drop-shadow max-w-lg">
//             Explore vibrant local clubs, attend events, and grow your passion
//             with ClubSphere — the platform for every community.
//           </p>

//           <div className="mt-6 flex gap-4">
//             <Link
//               to="/clubs"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
//             >
//               Join a Club
//             </Link>

//             <Link
//               to="/dashboard/manager/create-club"
//               className="border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Create a Club
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
//------------------------------------import { motion } from "framer-motion";
import { Link } from "react-router";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section
      className="h-[70vh] w-full bg-cover bg-center relative flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/RT8RHfP9/360-F-692029049-SLFDJDh48-H6sj-F6l-Ckg6z1k6l1-Mkzlp-L.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0  bg-opacity-60"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 backdrop-blur-md 
                   bg-white/40 shadow-xl border border-white/30 rounded-lg p-10 max-w-3xl px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
          Connect. Engage. Grow.
        </h1>

        <p className="text-gray-200 mt-4 text-lg md:text-xl drop-shadow">
          Discover amazing clubs, join inspiring communities, and take part in
          meaningful events — all within ClubSphere.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            to="/clubs"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
          >
            Explore Clubs
          </Link>

          <Link
            to="/dashboard/manager/create-club"
            className="border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            Create a Club
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
