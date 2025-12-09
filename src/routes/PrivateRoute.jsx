// import useAuth from '../hooks/useAuth'
// import { Navigate, useLocation } from 'react-router'
// import LoadingSpinner from '../components/Shared/LoadingSpinner'

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useAuth()
//   const location = useLocation()

//   if (loading) return <LoadingSpinner />
//   if (user) return children
//   return <Navigate to='/login' state={location.pathname} replace='true' />
// }

// export default PrivateRoute

import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  // Role check (optional)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // যদি unauthorized role → default dashboard / fallback page
    if (user.role === "member")
      return <Navigate to="/dashboard/member" replace />;
    if (user.role === "manager")
      return <Navigate to="/dashboard/manager" replace />;
    if (user.role === "admin")
      return <Navigate to="/dashboard/admin" replace />;
  }

  return children;
};

export default PrivateRoute;
