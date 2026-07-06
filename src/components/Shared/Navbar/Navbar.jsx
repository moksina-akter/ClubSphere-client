// import Container from "../Container";
// import { AiOutlineMenu } from "react-icons/ai";
// import { useState } from "react";
// import { Link } from "react-router"; // correct import
// import useAuth from "../../../hooks/useAuth";
// import avatarImg from "../../../assets/images/placeholder.jpg";
// import logo from "../../../../public/logo.jpeg";
// import LoadingSpinner from "../LoadingSpinner";
// const Navbar = () => {
//   const { user, logOut, loading } = useAuth() || {};
//   const [isOpen, setIsOpen] = useState(false);

//   if (loading) {
//     return <LoadingSpinner></LoadingSpinner>;
//   }
//   return (
//     <div className="fixed w-full bg-[#FF6A1C] z-50 shadow-sm">
//       <Container>
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <Link to="/">
//             <img
//               src={logo}
//               alt="ClubSphere Logo"
//               className="w-12 h-12 rounded-full"
//             />
//           </Link>

//           {/* Public Links (visible on md+) */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link to="/" className="hover:text-[#b77451] font-medium">
//               Home
//             </Link>
//             <Link to="/club" className="hover:text-[#b77451] font-medium">
//               Clubs
//             </Link>
//             <Link to="/events" className="hover:text-[#b77451] font-medium">
//               Events
//             </Link>
//           </div>

//           {/* Auth & Avatar Dropdown */}
//           <div className="relative">
//             <div
//               onClick={() => setIsOpen(!isOpen)}
//               className="flex items-center gap-2 border border-neutral-200 rounded-full p-2 cursor-pointer hover:shadow-md transition"
//             >
//               <AiOutlineMenu className="text-lg" />
//               <img
//                 src={user?.photoURL || avatarImg}
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full"
//                 referrerPolicy="no-referrer"
//               />
//             </div>

//             {isOpen && (
//               <div className="absolute right-0 top-12 bg-white shadow-md rounded-xl w-44 overflow-hidden text-sm">
//                 <div className="flex flex-col">
//                   {/* Public links for mobile */}
//                   <Link
//                     to="/"
//                     className="block px-4 py-2 hover:bg-neutral-100 transition font-medium md:hidden"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Home
//                   </Link>
//                   <Link
//                     to="/club"
//                     className="block px-4 py-2 hover:bg-neutral-100 transition font-medium md:hidden"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Clubs
//                   </Link>
//                   <Link
//                     to="/events"
//                     className="block px-4 py-2 hover:bg-neutral-100 transition font-medium md:hidden"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Events
//                   </Link>

//                   {user ? (
//                     <>
//                       <Link
//                         to="/dashboard"
//                         className="block px-4 py-2 hover:bg-neutral-100 transition font-medium"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         Dashboard
//                       </Link>
//                       <div
//                         onClick={() => {
//                           logOut();
//                           setIsOpen(false);
//                         }}
//                         className="block px-4 py-2 hover:bg-neutral-100 transition font-medium cursor-pointer"
//                       >
//                         Logout
//                       </div>
//                       <Link
//                         to="/dashboard/profile"
//                         className="block px-4 py-2 hover:bg-neutral-100 transition font-medium"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         Profile
//                       </Link>
//                     </>
//                   ) : (
//                     <>
//                       <Link
//                         to="/login"
//                         className="block px-4 py-2 hover:bg-neutral-100 transition font-medium"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         Login
//                       </Link>
//                       <Link
//                         to="/register"
//                         className="block px-4 py-2 hover:bg-neutral-100 transition font-medium"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         Register
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Navbar;

import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5"; // নোটিফিকেশন আইকন
import { FiSearch, FiChevronDown } from "react-icons/fi"; // সার্চ ও ডাউন অ্যারো আইকন
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../../public/logo.jpeg";
import LoadingSpinner from "../LoadingSpinner";

const Navbar = () => {
  const { user, logOut, loading } = useAuth() || {};
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // অ্যাক্টিভ লিংকের নিচের আন্ডারলাইন স্টাইল করার জন্য
  const linkStyles = ({ isActive }) =>
    `font-semibold transition relative py-2 ${
      isActive
        ? "text-[#FF6A1C] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[rgb(220,84,11)]"
        : "text-slate-700 hover:text-[rgb(220,84,11)]"
    }`;

  return (
    <div className="fixed w-full bg-white z-50 shadow-sm border-b border-slate-100">
      <Container>
        <div className="flex justify-between items-center py-3">
          {/* ১. লোগো ও ব্র্যান্ড নেম */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="ClubSphere Logo"
              className="w-9 h-9 object-contain"
            />
            <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
              ClubSphere
            </span>
          </Link>

          {/* ২. পাবলিক মেনু লিংকস (ল্যাপটপ/ডেস্কটপ ভিউ) */}
          <div className="hidden lg:flex items-center gap-6 text-md">
            <NavLink to="/" className={linkStyles}>
              Home
            </NavLink>
            <NavLink to="/club" className={linkStyles}>
              Clubs
            </NavLink>
            <NavLink to="/events" className={linkStyles}>
              Events
            </NavLink>
            <NavLink to="/about" className={linkStyles}>
              About Us
            </NavLink>
            <NavLink to="/blog" className={linkStyles}>
              Blog
            </NavLink>
          </div>

          {/* ৩. সার্চ বার (ল্যাপটপ/ডেস্কটপ ভিউ) */}
          <div className="hidden md:flex items-center relative max-w-xs w-full mx-4">
            <input
              type="text"
              placeholder="Search clubs, events..."
              className="w-full bg-slate-50 border border-slate-200 text-sm pl-4 pr-10 py-2 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />
            <FiSearch className="absolute right-3 text-slate-400 text-lg cursor-pointer hover:text-blue-600" />
          </div>

          {/* ৪. রাইট সাইড সেকশন (নোটিফিকেশন, প্রোফাইল ড্রপডাউন ও মোবাইল মেনু) */}
          <div className="flex items-center gap-4">
            {/* নোটিফিকেশন বেল (রেড ডট সহ) */}
            <div className="relative cursor-pointer p-1.5 hover:bg-slate-100 rounded-full transition">
              <IoNotificationsOutline className="text-2xl text-slate-700" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            {/* প্রোফাইল এবং ড্রপডাউন কন্ট্রোল */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5  rounded-full p-1.5 cursor-pointer hover:shadow-sm hover:bg-slate-50 transition"
              >
                {/* মোবাইল স্ক্রিনে মেনু নেভিগেশনের জন্য AiOutlineMenu বার */}
                <AiOutlineMenu className="text-lg text-slate-600 lg:hidden" />

                <img
                  src={user?.photoURL || avatarImg}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <FiChevronDown className="text-slate-500 text-sm hidden sm:block" />
              </div>

              {/* ড্রপডাউন মেনু বক্স */}
              {isOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-xl border border-slate-100 rounded-2xl w-48 overflow-hidden text-sm py-1 z-50 dynamic-fade-in">
                  <div className="flex flex-col">
                    {/* মোবাইল ভিউর জন্য নেভিগেশন লিংকস */}
                    <div className="lg:hidden border-b border-slate-100 pb-1">
                      <Link
                        to="/"
                        className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        to="/club"
                        className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Clubs
                      </Link>
                      <Link
                        to="/events"
                        className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Events
                      </Link>
                      <Link
                        to="/about"
                        className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
                        onClick={() => setIsOpen(false)}
                      >
                        About Us
                      </Link>
                      <Link
                        to="/blog"
                        className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Blog
                      </Link>
                    </div>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          My Profile
                        </Link>
                        <div
                          onClick={() => {
                            logOut();
                            setIsOpen(false);
                          }}
                          className="block px-4 py-2 hover:bg-red-50 text-red-600 font-medium cursor-pointer border-t border-slate-100"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
