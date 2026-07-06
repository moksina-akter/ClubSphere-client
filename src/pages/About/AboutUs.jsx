import { Link } from "react-router";
import { FiUsers, FiTarget, FiAward, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion"; // ১. ফ্রেমার মোশন ইম্পোর্ট করা হলো
import founderImg from "../../assets/images/images.jpeg";

const AboutUs = () => {
  // স্ট্যাটিক স্ট্যাটিস্টিক্স ডেটা
  const stats = [
    { id: 1, value: "50+", label: "Active Clubs" },
    { id: 2, value: "2,500+", label: "Happy Members" },
    { id: 3, value: "180+", label: "Events Hosted" },
    { id: 4, value: "15+", label: "Local Cities" },
  ];

  // কোর ভ্যালুস ডেটা
  const values = [
    {
      icon: <FiUsers className="text-3xl text-[rgb(220,84,11)]" />,
      title: "Community First",
      desc: "We believe in bringing people together to build lasting bonds and impactful networks.",
    },
    {
      icon: <FiTarget className="text-3xl text-[rgb(220,84,11)]" />,
      title: "Passion Driven",
      desc: "Whether it is tech, sports, or arts—we create spaces where your hobbies thrive.",
    },
    {
      icon: <FiAward className="text-3xl text-[rgb(220,84,11)]" />,
      title: "Inclusivity",
      desc: "ClubSphere is for everyone. We foster a welcoming environment for all backgrounds.",
    },
  ];

  // স্ক্রোল অ্যানিমেশনের জন্য কমন ভ্যারিয়েন্ট
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen overflow-hidden">
      {/* ১. Hero Section (Fade-in with scale motion) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white py-16 md:py-2 border-b border-slate-100"
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-[#FF6A1C] font-semibold tracking-wide uppercase text-sm">
            About ClubSphere
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mt-3 tracking-tight">
            Connecting People Through <br className="hidden md:block" />
            <span className="text-[#FF6A1C]">Shared Passions</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            ClubSphere is a centralized platform designed to simplify how local
            communities discover, join, and manage clubs and events. We bridge
            the gap between enthusiastic individuals and vibrant local groups.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/club"
              className="btn bg-[#FF6A1C] hover:bg-[rgb(220,84,11)] text-white border-none normal-case rounded-xl px-6 shadow-md transition"
            >
              Explore Clubs
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline border-[#FF6A1C] text-[#FF6A1C] hover:bg-[#FF6A1C] hover:border-[#FF6A1C] hover:text-white normal-case rounded-xl px-6 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ২. Mission & Vision Section (Scroll-triggered Motion) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="p-3 bg-orange-50 w-fit rounded-xl mb-4">
              <FiTarget className="text-2xl text-[rgb(220,84,11)]" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Our Mission
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To empower local communities by providing robust digital tools
              that make club membership, event coordination, and communication
              seamless and accessible to everyone.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="p-3 bg-orange-50 w-fit rounded-xl mb-4">
              <FiTrendingUp className="text-2xl text-[rgb(220,84,11)]" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Our Vision
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To become the ultimate ecosystem for local engagement, fostering a
              world where no passion goes unnoticed and every individual finds
              their perfect community.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ৩. Dynamic Stats Counter (Orange Theme Banner) */}
      <div className="bg-[#FF6A1C] my-8 py-12 text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {stat.value}
              </h2>
              <p className="text-orange-100 text-xs md:text-sm mt-2 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ৪. Core Values Section (Staggered Animation) */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Our Core Values
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            The principles that guide our platform and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition"
            >
              <div className="mx-auto w-fit p-4 bg-orange-50 rounded-full mb-4">
                {value.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">
                {value.title}
              </h4>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ৫. Team / Founder Section (Pop-in Animation) */}
      <div className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Meet the Creator
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              The mind behind ClubSphere.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center shadow-sm max-w-sm"
          >
            <img
              src={founderImg}
              alt="Founder"
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md mb-4"
            />
            <h4 className="text-lg font-bold text-slate-800">Moksina Akter</h4>
            <p className="text-[#FF6A1C] text-xs font-semibold uppercase tracking-wider mt-1">
              Founder & Lead Developer
            </p>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              A passionate Full Stack MERN Developer dedicated to building
              solutions that impact real-world communities.
            </p>

            <div className="flex justify-center gap-4 mt-4 text-slate-500 text-sm">
              <a
                href="#"
                className="hover:text-[rgb(220,84,11)] font-medium transition"
              >
                GitHub
              </a>
              <a
                href="#"
                className="hover:text-[rgb(220,84,11)] font-medium transition"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
