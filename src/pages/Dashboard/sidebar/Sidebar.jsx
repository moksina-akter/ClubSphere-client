import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {
  const { role, logOut, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      roles: ["admin"],
      links: [
        { to: "/dashboard/admin", label: "Admin Overview" },
        { to: "/dashboard/admin/manage-users", label: "Manage Users" },
        { to: "/dashboard/admin/manage-clubs", label: "Manage Clubs" },
        { to: "/dashboard/admin/payments", label: "Payments" },
      ],
    },
    {
      roles: ["clubManager"],
      links: [
        { to: "/dashboard/manager", label: "Manager Overview" },
        { to: "/dashboard/manager/my-clubs", label: "My Clubs" },
        { to: "/dashboard/manager/events", label: "Events" },
        { to: "/dashboard/manager/members", label: "Members" },
        {
          to: "/dashboard/manager/events-registration",
          label: "Event Registrations",
        },
      ],
    },
    {
      roles: ["member"],
      links: [
        { to: "/dashboard/member", label: "Member Overview" },
        { to: "/dashboard/member/my-clubs", label: "My Clubs" },
        { to: "/dashboard/member/my-events", label: "My Events" },
        { to: "/dashboard/member/payments", label: "Payment History" },
      ],
    },
  ];

  const roleMenu = menuItems.find((item) => item.roles.includes(role));

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/dashboard/profile");
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    logOut();
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-50 to-blue-200 p-5 flex flex-col justify-between shadow-xl transition-transform duration-300 z-40 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:sticky md:top-0 overflow-y-auto`}
      >
        <div>
          {/* Logo */}
          <Link
            to="/"
            className="block font-extrabold text-3xl bg-blue-100 p-3 w-full rounded text-center mb-10 shadow-md hover:bg-blue-200 transition"
            onClick={() => setIsOpen(false)}
          >
            ClubSphere
          </Link>

          {/* Menu Links */}
          <ul className="space-y-5">
            {roleMenu?.links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg hover:bg-blue-300 transition
                    ${
                      isActive
                        ? "bg-blue-400 text-white font-semibold shadow-md"
                        : "text-gray-800"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile & Logout */}
        <div className="mt-10 pt-10 border-t border-blue-300 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover shadow-sm border-2 border-white"
            />
            <div className="overflow-hidden">
              <p className="font-semibold truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-sm text-gray-600 capitalize">{role}</p>
            </div>
          </div>

          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-300 transition font-medium"
          >
            <CgProfile size={20} /> Profile
          </button>

          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-400 text-red-700 hover:text-white transition font-medium"
          >
            <GrLogout size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
