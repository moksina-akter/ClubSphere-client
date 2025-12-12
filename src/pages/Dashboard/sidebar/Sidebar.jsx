import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import { GrLogout } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const { role, logOut, updateUserProfile } = useAuth();
  // console.log(role);
  return (
    <div className="w-64 bg-gradient-to-b from-blue-10 to-blue-200 min-h-screen flex flex-col justify-between p-5 fixed md:relative">
      <div>
        <Link
          to="/"
          className="font-bold text-2xl bg-blue-200 p-2 w-full rounded text-center mb-8"
        >
          ClubSphere
        </Link>
        <ul className="space-y-6 mt-2 p-1 ">
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin">Admin Overview</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-users">
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-clubs">
                  Manage Clubs
                </NavLink>
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
                <NavLink to="/dashboard/member/member-my-clubs">
                  My Clubs
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/member/my-events">My Events</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/member/payments">
                  Payment History
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div>
        <Link
          onClick={logOut}
          className="w-full text-left py-2 px-4 hover:bg-gray-200 mt-4 flex items-center gap-2"
        >
          <GrLogout /> Logout
        </Link>
        <Link
          onClick={updateUserProfile}
          className="w-full text-left py-2 px-4 hover:bg-gray-200 mt-4 flex items-center gap-2"
        >
          <CgProfile />
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
