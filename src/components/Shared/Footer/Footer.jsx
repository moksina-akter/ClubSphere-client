import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiMail } from "react-icons/fi"; // মডার্ন ইমেইল আইকনের জন্য
import { Link } from "react-router";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 text-slate-600">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-4 px-4">
          {/* লেফট কলাম: About / Logo */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link
              to="/"
              className="text-2xl font-black text-slate-800 tracking-tight"
            >
              Club<span className="text-[#FF6A1C]">Sphere</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              ClubSphere helps you discover, join, and manage local clubs and
              events. Stay connected and make your community active!
            </p>
          </div>

          {/* মিডল কলাম: সব লিঙ্ক একসাথে (About Us, Blog সহ) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="hover:text-[#FF6A1C] transition-colors w-fit"
                >
                  Home
                </Link>
                <Link
                  to="/club"
                  className="hover:text-[#FF6A1C] transition-colors w-fit"
                >
                  Clubs
                </Link>
                <Link
                  to="/events"
                  className="hover:text-[#FF6A1C] transition-colors w-fit"
                >
                  Events
                </Link>
                <Link
                  to="/about-us"
                  className="hover:text-[#FF6A1C] transition-colors w-fit"
                >
                  About Us
                </Link>
                <Link
                  to="/blog"
                  className="hover:text-[#FF6A1C] transition-colors w-fit"
                >
                  Blog
                </Link>
              </div>
              {/* <div className="flex flex-col gap-2"></div> */}
            </div>
          </div>

          {/* রাইট কলাম: Social Links (X এর জায়গায় Email) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
              Contact & Socials
            </h3>
            <p className="text-xs text-gray-400">
              Get in touch or follow our professional updates.
            </p>
            <div className="flex gap-3 mt-1">
              {/* GitHub */}
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#0077B5] hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              {/* Email (X এর বদলে যোগ করা হয়েছে) */}
              <a
                href="mailto:msdiya01865@gmail.com" // তোমার প্রফেশনাল ইমেইলটি সেট করে দেওয়া হয়েছে
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-orange-600 hover:bg-orange-50 hover:border-orange-200 transition-all duration-200"
              >
                <FiMail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Footer bottom bar */}
      <div className="border-t border-slate-100 py-6 text-center text-xs font-medium text-gray-400 bg-slate-50/50">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 gap-2">
            <span>
              &copy; {new Date().getFullYear()} ClubSphere. All rights reserved.
            </span>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-slate-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
