import { Link } from "react-router";
import { motion } from "framer-motion";

const Hero = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  return (
    <section className="min-h-[75vh] w-full bg-gradient-to-tr from-slate-50 via-orange-50/30 to-blue-50/20 flex items-center justify-center py-12 lg:py-0 overflow-hidden relative">
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Typography & Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="text-center lg:text-left space-y-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider"
          >
            Welcome to ClubSphere
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 leading-[1.1] tracking-tight"
          >
            Connect. Engage.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6A1C] to-[#EE3A19]">
              Grow Together.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Discover amazing clubs, join inspiring communities, and take part in
            meaningful events — all within one powerful ecosystem.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
          >
            <Link
              to="/club"
              className="bg-[#FF6A1C] hover:bg-[#EE3A19] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Clubs
            </Link>

            <Link
              to="/dashboard/manager/my-clubs"
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              Create a Club
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Modern Image/Visual Presentation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
              alt="Community engagement"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-4 sm:left-6 bg-white shadow-xl rounded-2xl p-4 border border-slate-100 hidden sm:flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xl">
              🔥
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">
                Active Community
              </p>
              <p className="text-sm font-bold text-slate-800">
                120+ Active Clubs
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
