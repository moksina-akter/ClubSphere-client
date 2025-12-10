// import { useState } from "react";
// import { NavLink } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import { GrLogout } from "react-icons/gr";

// const Sidebar = () => {
//   const { user, logOut } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   if (!user?.role) return <p className="p-4 text-gray-800">Loading...</p>;

//   const links = {
//     member: [
//       { path: "/dashboard/member", label: "Overview" },
//       { path: "/dashboard/member/member-my-clubs", label: "My Clubs" },
//       { path: "/dashboard/member/my-events", label: "My Events" },
//       { path: "/dashboard/member/payment-history", label: "Payment History" },
//     ],
//     manager: [
//       { path: "/dashboard/manager", label: "Overview" },
//       { path: "/dashboard/manager/my-clubs", label: "My Clubs" },
//       { path: "/dashboard/manager/events", label: "Manage Events" },
//       { path: "/dashboard/manager/members", label: "Members" },
//       {
//         path: "/dashboard/manager/events-registration",
//         label: "Event Registrations",
//       },
//     ],
//     admin: [
//       { path: "/dashboard/admin", label: "Overview" },
//       { path: "/dashboard/admin/manage-users", label: "Users" },
//       { path: "/dashboard/admin/manage-clubs", label: "Clubs" },
//       { path: "/dashboard/admin/payments", label: "Payments" },
//     ],
//   };

//   return (
//     <>
//       {/* Mobile Toggle */}
//       <div className="md:hidden flex justify-between items-center bg-gray-800 text-white p-4">
//         <h1 className="text-lg font-bold">ClubSphere</h1>
//         <button onClick={() => setIsOpen(!isOpen)}>
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`bg-gray-800 text-white w-64 p-4 md:fixed md:h-full transform top-0 left-0 transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         <h1 className="text-xl font-bold mb-4 hidden md:block">ClubSphere</h1>

//         <nav className="flex flex-col">
//           {links[user.role].map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={({ isActive }) =>
//                 `mb-2 p-2 rounded hover:bg-gray-700 ${
//                   isActive ? "bg-gray-700" : ""
//                 }`
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="mt-auto">
//           <button
//             onClick={logOut}
//             className="flex items-center px-2 py-1 mt-4 hover:bg-gray-700 rounded"
//           >
//             <GrLogout className="mr-2" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router";

const Sidebar = () => {
  const { role } = useAuth();

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-5 fixed md:relative">
      <h1 className="font-bold text-2xl bg-blue-200 p-2 rounded-xl text-center mb-5">
        ClubSphere
      </h1>
      <ul className="space-y-6 p-1">
        {role === "admin" && (
          <>
            <li>
              <NavLink to="/dashboard/admin">Admin Overview</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/manage-users">Manage Users</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/manage-clubs">Manage Clubs</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/payments">Payments</NavLink>
            </li>
          </>
        )}
        {role === "manager" && (
          <>
            <li>
              <NavLink to="/dashboard/manager">Manager Overview</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manager/my-clubs">My Clubs</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manager/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manager/members">Members</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manager/events-registration">
                Event Registrations
              </NavLink>
            </li>
          </>
        )}
        {role === "member" && (
          <>
            <li>
              <NavLink to="/dashboard/member">Member Overview</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/member/member-my-clubs">My Clubs</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/member/my-events">My Events</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/member/payment-history">
                Payment History
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
