import { motion } from "framer-motion";
import { Search, UserPlus, CalendarCheck, LayoutDashboard } from "lucide-react";
import Container from "../../components/Shared/Container";

const steps = [
  {
    id: 1,
    title: "Explore Clubs",
    desc: "Browse hundreds of clubs based on your interests and location.",
    icon: <Search size={40} className="text-blue-500" />,
  },
  {
    id: 2,
    title: "Join with Membership",
    desc: "Join free or paid clubs easily using secure Stripe payment.",
    icon: <UserPlus size={40} className="text-green-500" />,
  },
  {
    id: 3,
    title: "Register for Events",
    desc: "Participate in events organized by your favorite clubs.",
    icon: <CalendarCheck size={40} className="text-purple-500" />,
  },
  {
    id: 4,
    title: "Manage Everything",
    desc: "Control all your memberships & events inside a powerful dashboard.",
    icon: <LayoutDashboard size={40} className="text-orange-500" />,
  },
];

export default function HowItWorks() {
  return (
    <Container>
      <section className="py-16 ">
        <div className=" px-4">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            How <span className="text-blue-600">ClubSphere</span> Works
          </motion.h2>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
