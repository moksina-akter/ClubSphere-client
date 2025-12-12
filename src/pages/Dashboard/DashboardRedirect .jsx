import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const DashboardRedirect = () => {
  const { user, role, loading } = useAuth();

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  if (role === "member") return <Navigate to="/dashboard/member" replace />;
  if (role === "manager") return <Navigate to="/dashboard/manager" replace />;
  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;

  return <Navigate to="/login" replace />;
};

export default DashboardRedirect;
