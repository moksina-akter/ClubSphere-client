// import { motion } from "framer-motion";
// import {
//   Users,
//   Lightbulb,
//   Trophy,
//   Handshake,
//   Star,
//   Globe,
//   MessageCircle,
//   Rocket,
// } from "lucide-react";
// import Container from "../../components/Shared/Container";

// const benefits = [
//   {
//     title: "Connect & Network",
//     desc: "Meet amazing people and build your professional and personal network.",
//     icon: <Users size={36} className="text-white" />,
//     bg: "bg-gradient-to-tr from-pink-400 to-pink-600",
//   },
//   {
//     title: "Learn & Grow",
//     desc: "Participate in workshops, events, and improve your skills every day.",
//     icon: <Lightbulb size={36} className="text-white" />,
//     bg: "bg-gradient-to-tr from-indigo-400 to-indigo-600",
//   },
//   {
//     title: "Achieve & Celebrate",
//     desc: "Reach milestones in clubs and celebrate your achievements together.",
//     icon: <Trophy size={36} className="text-white" />,
//     bg: "bg-gradient-to-tr from-green-400 to-green-600",
//   },
//   {
//     title: "Contribute & Collaborate",
//     desc: "Work with club members on exciting projects and community initiatives.",
//     icon: <Handshake size={36} className="text-white" />,
//     bg: "bg-gradient-to-tr from-yellow-400 to-yellow-600",
//   },
//   {
//     title: "Explore New Ideas",
//     desc: "Engage in creative brainstorming sessions and innovative projects.",
//     icon: <Star size={36} className="text-white" />,
//     bg: "bg-gradient-to-tr from-purple-400 to-purple-600",
//   },
//   {
//     title: "Global Exposure",
//     desc: "Participate in international events and expand your horizons.",
//     icon: <Globe size={36} className="text-white" />,
//     bg: "bg-gradient-to-tr from-teal-400 to-teal-600",
//   },
//   {
//     title: "Share & Communicate",
//     desc: "Collaborate with members, discuss ideas, and share experiences.",
//     icon: <MessageCircle size={36} className="text-white" />,
//     bg: "bg-gradient-to-tr from-orange-400 to-orange-600",
//   },
//   {
//     title: "Achieve Faster",
//     desc: "Get guidance and mentorship to reach your goals quickly.",
//     icon: <Rocket size={36} className="text-white" />,
//     bg: "bg-gradient-to-tr from-red-400 to-red-600",
//   },
// ];

// export default function WhyJoinUnique() {
//   return (
//     <Container>
//       <section className="py-20">
//         <div className=" px-4">
//           {/* Heading */}
//           <motion.h2
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl md:text-4xl font-bold text-center mb-16"
//           >
//             Why You Should{" "}
//             <span className="text-[#FF6A1C]">Join a ClubSphere Club?</span>
//           </motion.h2>

//           {/* Benefits Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//             {benefits.map((b, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.15 }}
//                 className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
//               >
//                 {/* Icon */}
//                 <div
//                   className={`w-16 h-16 flex items-center justify-center rounded-full ${b.bg} flex-shrink-0`}
//                 >
//                   {b.icon}
//                 </div>

//                 {/* Text */}
//                 <div>
//                   <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
//                   <p className="text-gray-700">{b.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </Container>
//   );
// }
import { motion } from "framer-motion";
import {
  Users,
  Lightbulb,
  Trophy,
  Handshake,
  Star,
  Globe,
  MessageCircle,
  Rocket,
} from "lucide-react";
import Container from "../../components/Shared/Container";

const benefits = [
  {
    title: "Connect & Network",
    desc: "Meet amazing people and build your professional network.",
    icon: <Users size={24} className="text-pink-600" />,
    bg: "bg-pink-50",
  },
  {
    title: "Learn & Grow",
    desc: "Participate in workshops and improve your core skills.",
    icon: <Lightbulb size={24} className="text-indigo-600" />,
    bg: "bg-indigo-50",
  },
  {
    title: "Achieve & Celebrate",
    desc: "Reach milestones and celebrate your wins together.",
    icon: <Trophy size={24} className="text-green-600" />,
    bg: "bg-green-50",
  },
  {
    title: "Collaborate",
    desc: "Work with team members on exciting projects.",
    icon: <Handshake size={24} className="text-yellow-600" />,
    bg: "bg-yellow-50",
  },
  {
    title: "Explore Ideas",
    desc: "Engage in creative and innovative brainstorming.",
    icon: <Star size={24} className="text-purple-600" />,
    bg: "bg-purple-50",
  },
  {
    title: "Global Exposure",
    desc: "Participate in international club communities.",
    icon: <Globe size={24} className="text-teal-600" />,
    bg: "bg-teal-50",
  },
  {
    title: "Share Insights",
    desc: "Discuss perspectives and share valid experiences.",
    icon: <MessageCircle size={24} className="text-orange-600" />,
    bg: "bg-orange-50",
  },
  {
    title: "Achieve Faster",
    desc: "Get fast tracking and guidance to reach your goals.",
    icon: <Rocket size={24} className="text-red-600" />,
    bg: "bg-red-50",
  },
];

export default function WhyJoinUnique() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container>
        <div className="px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight"
            >
              Why You Should{" "}
              <span className="text-[#FF6A1C]">Join ClubSphere</span>
            </motion.h2>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              Discover the ultimate perks of becoming a member
            </p>
          </div>

          {/* Benefits Grid (৩/৪ কলামে সাজানো মডার্ন লুক) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* ইউনিক সফ্ট কালার আইকন ব্যাকগ্রাউন্ড */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl ${b.bg} mb-4 flex-shrink-0`}
                >
                  {b.icon}
                </div>

                {/* টেক্সট */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-slate-800 mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
