// import { motion } from "framer-motion";
// import { Search, UserPlus, CalendarCheck, LayoutDashboard } from "lucide-react";
// import Container from "../../components/Shared/Container";

// const steps = [
//   {
//     id: 1,
//     title: "Explore Clubs",
//     desc: "Browse hundreds of clubs based on your interests and location.",
//     icon: <Search size={40} className="text-blue-500" />,
//   },
//   {
//     id: 2,
//     title: "Join with Membership",
//     desc: "Join free or paid clubs easily using secure Stripe payment.",
//     icon: <UserPlus size={40} className="text-green-500" />,
//   },
//   {
//     id: 3,
//     title: "Register for Events",
//     desc: "Participate in events organized by your favorite clubs.",
//     icon: <CalendarCheck size={40} className="text-purple-500" />,
//   },
//   {
//     id: 4,
//     title: "Manage Everything",
//     desc: "Control all your memberships & events inside a powerful dashboard.",
//     icon: <LayoutDashboard size={40} className="text-orange-500" />,
//   },
// ];

// export default function HowItWorks() {
//   return (
//     <Container>
//       <section className=" ">
//         <div className=" px-4">
//           {/* Heading */}
//           <motion.h2
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl md:text-4xl font-bold text-center mb-8"
//           >
//             How <span className="text-[#FF6A1C]">ClubSphere</span> Works
//           </motion.h2>

//           {/* Steps Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {steps.map((step, index) => (
//               <motion.div
//                 key={step.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: index * 0.15 }}
//                 className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
//               >
//                 <div className="flex justify-center mb-4">{step.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//                 <p className="text-gray-600">{step.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </Container>
//   );
// }
import { motion } from "framer-motion";
import { Search, UserPlus, CalendarCheck, LayoutDashboard } from "lucide-react";
import Container from "../../components/Shared/Container";

const steps = [
  {
    id: 1,
    stepNo: "01",
    title: "Explore Clubs",
    desc: "Browse hundreds of clubs based on your interests and location.",
    icon: <Search size={28} className="text-blue-500" />,
    borderColor: "group-hover:border-blue-500",
  },
  {
    id: 2,
    stepNo: "02",
    title: "Join Membership",
    desc: "Join free or paid clubs easily using secure Stripe payment.",
    icon: <UserPlus size={28} className="text-green-500" />,
    borderColor: "group-hover:border-green-500",
  },
  {
    id: 3,
    stepNo: "03",
    title: "Register Events",
    desc: "Participate in events organized by your favorite clubs.",
    icon: <CalendarCheck size={28} className="text-purple-500" />,
    borderColor: "group-hover:border-purple-500",
  },
  {
    id: 4,
    stepNo: "04",
    title: "Manage Dashboard",
    desc: "Control all your memberships & events inside a powerful dashboard.",
    icon: <LayoutDashboard size={28} className="text-orange-500" />,
    borderColor: "group-hover:border-orange-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent overflow-hidden">
      <Container>
        <div className="px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight"
            >
              How <span className="text-[#FF6A1C]">ClubSphere</span> Works
            </motion.h2>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              Get started in 4 simple and easy steps
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group relative flex flex-col items-center pt-10"
              >
                {/* স্টেপ কাউন্টার ব্যাজ */}
                <span className="absolute top-4 right-5 text-4xl font-black text-slate-100 group-hover:text-orange-100 transition-colors select-none">
                  {step.stepNo}
                </span>

                {/* আইকন কন্টেইনার */}
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {step.icon}
                </div>

                {/* টেক্সট কন্টেন্ট */}
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#FF6A1C] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
