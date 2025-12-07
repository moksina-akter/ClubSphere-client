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
    desc: "Meet amazing people and build your professional and personal network.",
    icon: <Users size={36} className="text-white" />,
    bg: "bg-gradient-to-tr from-pink-400 to-pink-600",
  },
  {
    title: "Learn & Grow",
    desc: "Participate in workshops, events, and improve your skills every day.",
    icon: <Lightbulb size={36} className="text-white" />,
    bg: "bg-gradient-to-tr from-indigo-400 to-indigo-600",
  },
  {
    title: "Achieve & Celebrate",
    desc: "Reach milestones in clubs and celebrate your achievements together.",
    icon: <Trophy size={36} className="text-white" />,
    bg: "bg-gradient-to-tr from-green-400 to-green-600",
  },
  {
    title: "Contribute & Collaborate",
    desc: "Work with club members on exciting projects and community initiatives.",
    icon: <Handshake size={36} className="text-white" />,
    bg: "bg-gradient-to-tr from-yellow-400 to-yellow-600",
  },
  {
    title: "Explore New Ideas",
    desc: "Engage in creative brainstorming sessions and innovative projects.",
    icon: <Star size={36} className="text-white" />,
    bg: "bg-gradient-to-tr from-purple-400 to-purple-600",
  },
  {
    title: "Global Exposure",
    desc: "Participate in international events and expand your horizons.",
    icon: <Globe size={36} className="text-white" />,
    bg: "bg-gradient-to-tr from-teal-400 to-teal-600",
  },
  {
    title: "Share & Communicate",
    desc: "Collaborate with members, discuss ideas, and share experiences.",
    icon: <MessageCircle size={36} className="text-white" />,
    bg: "bg-gradient-to-tr from-orange-400 to-orange-600",
  },
  {
    title: "Achieve Faster",
    desc: "Get guidance and mentorship to reach your goals quickly.",
    icon: <Rocket size={36} className="text-white" />,
    bg: "bg-gradient-to-tr from-red-400 to-red-600",
  },
];

export default function WhyJoinUnique() {
  return (
    <Container>
      <section className="py-20">
        <div className=" px-4">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Why You Should{" "}
            <span className="text-blue-700">Join a ClubSphere Club?</span>
          </motion.h2>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full ${b.bg} flex-shrink-0`}
                >
                  {b.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
                  <p className="text-gray-700">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
