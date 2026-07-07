import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // ক্যাটাগরি লিস্ট
  const categories = [
    "All",
    "Management",
    "Events",
    "Photography",
    "Tech",
    "Fitness",
  ];

  // ডামি ব্লগ ডেটা (পরবর্তীতে মঙ্গোডিবি API দিয়ে রিপ্লেস করতে পারবেন)
  const blogs = [
    {
      id: 1,
      title: "10 Tips to Bootstrap Your Local Tech Club",
      excerpt:
        "Discover the exact steps to gather local developers, arrange venues, and find sponsors for your new tech community.",
      category: "Tech",
      author: "Admin",
      date: "July 04, 2026",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "How to Keep Club Members Engaged Long-Term",
      excerpt:
        "Losing members after a few months? Learn powerful gamification tactics and interactive event planning ideas.",
      category: "Management",
      author: "Moksina Akter (Founder)",
      date: "June 28, 2026",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Mastering Outdoor Photography: Club Event Guide",
      excerpt:
        "Planning a photo-walk? Here is a complete checklist for club managers to coordinate safe and exciting outdoor events.",
      category: "Photography",
      author: "Manager",
      date: "June 15, 2026",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Budgeting for Local Sports & Fitness Clubs",
      excerpt:
        "A transparent guide on setting membership fees, managing track records, and integrating Stripe for smooth payments.",
      category: "Fitness",
      author: "Admin",
      date: "May 22, 2026",
      image:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop",
    },
  ];

  // ফিল্টারিং লজিক (Search + Category)
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // মোশন ভ্যারিয়েন্টস
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className=" min-h-screen pb-16">
      {/* ১. Top Header সেকশন */}
      <div className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#FF6A1C] font-semibold tracking-wide uppercase text-xs sm:text-sm"
          >
            ClubSphere Resources
          </motion.span>
          {/* <-- এখানে স্পেসটি একদম ঠিক করে দেওয়া হয়েছে */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2 tracking-tight"
          >
            Insights & <span className="text-[#FF6A1C]">Community Stories</span>
          </motion.h1>

          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-3">
            Explore tips, guides, and success stories on how to successfully
            run, market, and expand local groups.
          </p>
          {/* সার্চ বার */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm pl-4 pr-10 py-3 rounded-2xl focus:outline-none focus:border-[#FF6A1C] focus:bg-white transition shadow-sm"
            />
            <FiSearch className="absolute right-4 top-3.5 text-slate-400 text-lg" />
          </div>
        </div>
      </div>

      {/* ২. ক্যাটাগরি ফিল্টার ট্যাব */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none justify-start md:justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-[#FF6A1C] border-[#FF6A1C] text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-[#FF6A1C] hover:text-[#FF6A1C]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ৩. ব্লগ গ্রিড লিস্ট */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {filteredBlogs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300"
              >
                {/* ইমেজ সেকশন (ক্যাটাগরি ব্যাজ সহ) */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[rgb(220,84,11)] text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                    {blog.category}
                  </span>
                </div>

                {/* কন্টেন্ট সেকশন */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* মেটা ডেটা (তারিখ ও লেখক) */}
                    <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
                      <div className="flex items-center gap-1">
                        <FiCalendar />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiUser />
                        <span>{blog.author}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 line-clamp-2 hover:text-[#FF6A1C] transition cursor-pointer mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* রিড মোর বাটন */}
                  <div className="pt-2 border-t border-slate-50 flex items-center text-xs sm:text-sm font-bold text-[#FF6A1C] hover:text-[rgb(220,84,11)] cursor-pointer group transition">
                    <span>Read Full Article</span>
                    <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* নো ডেটা ফাউন্ড স্টেট */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <p className="text-slate-400 font-medium">
              No articles found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
