// import useAuth from "../../hooks/useAuth";

// const DashboardRedirect = () => {
//   const { user, loading } = useAuth();
//   if (loading) {
//     return <div className="text-center mt-20">Loading...</div>;
//   }

//   if (!user?.role) {
//     return <div className="text-center mt-20">No role found</div>;
//   }

//   if (user.role === "member")
//     return <Navigate to="/dashboard/member" replace />;
//   if (user.role === "manager")
//     return <Navigate to="/dashboard/manager" replace />;
//   if (user.role === "admin") return <Navigate to="/dashboard/admin" replace />;

//   return null;
// };
// export default DashboardRedirect;

import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const DashboardRedirect = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user || !role) return <Navigate to="/login" replace />;

  if (role === "member") return <Navigate to="/dashboard/member" replace />;
  if (role === "manager") return <Navigate to="/dashboard/manager" replace />;
  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;

  return null;
};

export default DashboardRedirect;
