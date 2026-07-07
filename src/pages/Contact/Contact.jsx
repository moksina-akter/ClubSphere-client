import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const Contact = () => {
  // ফর্ম সাবমিট হ্যান্ডলার (আপনার ব্যাকএন্ড বা EmailJS এর সাথে পরে কানেক্ট করতে পারবেন)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
    e.target.reset();
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen pb-16">
      {/* ১. টপ হেডার সেকশন */}
      <div className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#FF6A1C] font-semibold tracking-wide uppercase text-xs sm:text-sm"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2 tracking-tight"
          >
            We would Love to{" "}
            <span className="text-[#FF6A1C]">Hear From You</span>
          </motion.h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-3">
            Have questions about club creation, event registration, or premium
            features? Reach out to us, and our team will get back to you
            shortly.
          </p>
        </div>
      </div>

      {/* ২. মেইন কন্টেন্ট গ্রিড (ইনফো + ফর্ম) */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* বামপাশ: কন্টাক্ট ইনফরমেশন কার্ডস (২ কলাম জুড়ে থাকবে) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-orange-50 text-[rgb(220,84,11)] rounded-xl">
                <FiMail className="text-xl" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-800">Email Us</h4>
                <p className="text-slate-500 text-sm mt-1">
                  support@clubsphere.com
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Response within 24 hours
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-orange-50 text-[rgb(220,84,11)] rounded-xl">
                <FiPhone className="text-xl" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-800">Call Us</h4>
                <p className="text-slate-500 text-sm mt-1">+880 1700-000000</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Mon - Fri, 9 AM to 6 PM
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-orange-50 text-[rgb(220,84,11)] rounded-xl">
                <FiMapPin className="text-xl" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-800">
                  Our Location
                </h4>
                <p className="text-slate-500 text-sm mt-1">Dhaka, Bangladesh</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Centralized Hub Support
                </p>
              </div>
            </div>
          </motion.div>

          {/* ডানপাশ: কন্টাক্ট মেসেজ ফর্ম (৩ কলাম জুড়ে থাকবে) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#FF6A1C] focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#FF6A1C] focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="How can we help you?"
                  className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#FF6A1C] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Write your details here..."
                  className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#FF6A1C] focus:bg-white transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto btn bg-[#FF6A1C] hover:bg-[rgb(220,84,11)] text-white border-none normal-case rounded-xl px-6 py-2.5 font-semibold flex items-center justify-center gap-2 shadow-sm transition"
              >
                <span>Send Message</span>
                <FiSend className="text-sm" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
