import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />; // show loader

  if (!user) return <Navigate to="/login" state={location.pathname} replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
