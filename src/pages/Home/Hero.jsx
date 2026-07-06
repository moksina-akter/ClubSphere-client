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
            to="/club"
            className="bg-[#FF6A1C] hover:bg-[rgb(220,84,11)] text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
          >
            Explore Clubs
          </Link>

          <Link
            to="/dashboard/manager/my-clubs"
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
