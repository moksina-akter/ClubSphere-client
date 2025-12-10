// import { Navigate, useLocation } from "react-router";
// import useAuth from "../hooks/useAuth";
// import LoadingSpinner from "../components/Shared/LoadingSpinner";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   // Loading screen
//   if (loading) return <LoadingSpinner />;

//   // If logged in → allow route
//   if (user) return children;

//   // If not logged in → redirect to login
//   return <Navigate to="/login" state={location.pathname} replace />;
// };

// export default PrivateRoute;

import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />; // show loader

  if (!user) return <Navigate to="/login" state={location.pathname} replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />; // role mismatch → redirect to dashboard
  }

  return children;
};

export default PrivateRoute;
