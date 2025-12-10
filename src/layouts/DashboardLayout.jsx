import { Outlet } from "react-router";
import Sidebar from "../pages/Dashboard/sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      <Sidebar />
      <div className="flex-1  md:ml-10">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
