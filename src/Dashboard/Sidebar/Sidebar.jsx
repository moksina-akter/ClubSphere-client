// import { useState } from "react";
// import { Link } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import logo from "../../../public/logo.jpeg";
// // Icons
// import { GrLogout } from "react-icons/gr";
// import { FcSettings } from "react-icons/fc";
// import { AiOutlineBars } from "react-icons/ai";
// import { BsGraphUp } from "react-icons/bs";

// // User Menu
// import MenuItem from "./Menu/MenuItem";
// import AdminMenu from "./Menu/AdminMenu";
// import SellerMenu from "./Menu/SellerMenu";
// import CustomerMenu from "./Menu/CustomerMenu";

// const Sidebar = () => {
//   const { logOut } = useAuth();
//   const [isActive, setActive] = useState(false);

//   // Sidebar Responsive Handler
//   const handleToggle = () => {
//     setActive(!isActive);
//   };

//   return (
//     <>
//       {/* Small Screen Navbar, only visible till md breakpoint */}
//       <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
//         <div>
//           <div className="block cursor-pointer p-4 font-bold">
//             <Link to="/">
//               <img src={logo} alt="logo" width="100" height="100" />
//             </Link>
//           </div>
//         </div>

//         <button
//           onClick={handleToggle}
//           className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
//         >
//           <AiOutlineBars className="h-5 w-5" />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
//           isActive && "-translate-x-full"
//         }  md:translate-x-0  transition duration-200 ease-in-out`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Top Content */}
//           <div>
//             {/* Logo */}
//             <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
//               <Link to="/">
//                 <img src={logo} alt="logo" width="100" height="100" />
//               </Link>
//             </div>
//           </div>

//           {/* Middle Content */}
//           <div className="flex flex-col justify-between flex-1 mt-6">
//             {/*  Menu Items */}
//             <nav>
//               {/* Common Menu */}
//               <MenuItem
//                 icon={BsGraphUp}
//                 label="Statistics"
//                 address="/dashboard"
//               />
//               {/* Role-Based Menu */}
//               <CustomerMenu />
//               <SellerMenu />
//               <AdminMenu />
//             </nav>
//           </div>

//           {/* Bottom Content */}
//           <div>
//             <hr />

//             <MenuItem
//               icon={FcSettings}
//               label="Profile"
//               address="/dashboard/profile"
//             />
//             <button
//               onClick={logOut}
//               className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
//             >
//               <GrLogout className="w-5 h-5" />

//               <span className="mx-4 font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
//----------------------------------------------------------
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../public/logo.jpeg";

// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";

import { BsGraphUp } from "react-icons/bs";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => setActive(!isActive);

  const links = {
    member: [
      { path: "/dashboard/member", label: "Overview", icon: BsGraphUp },
      { path: "/dashboard/member/my-clubs", label: "My Clubs" },
      { path: "/dashboard/member/my-events", label: "My Events" },
      { path: "/dashboard/member/payment-history", label: "Payment History" },
    ],
    manager: [
      { path: "/dashboard/manager", label: "Overview", icon: BsGraphUp },
      { path: "/dashboard/manager/my-clubs", label: "My Clubs" },
      { path: "/dashboard/manager/events", label: "Manage Events" },
      { path: "/dashboard/manager/members", label: "Members" },
    ],
    admin: [
      { path: "/dashboard/admin", label: "Overview", icon: BsGraphUp },
      { path: "/dashboard/admin/manage-users", label: "Users" },
      { path: "/dashboard/admin/manage-clubs", label: "Clubs" },
      { path: "/dashboard/admin/payments", label: "Payments" },
    ],
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="p-4 font-bold">
          <Link to="/">
            <img src={logo} alt="logo" width="100" height="100" />
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-800 text-white w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src={logo} alt="logo" className="w-24 h-24 rounded-lg" />
          </Link>
        </div>

        {/* Menu Links */}
        <nav className="flex-1">
          {links[user.role]?.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              {link.icon && <link.icon className="mr-2 w-5 h-5" />}
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Menu: Profile & Logout */}
        <div className="mt-auto">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FcSettings className="mr-2 w-5 h-5" />
            Profile
          </NavLink>

          <button
            onClick={logOut}
            className="flex items-center w-full p-2 mt-4 text-gray-200 hover:bg-gray-700 rounded transition-colors"
          >
            <GrLogout className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
