import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "Authentication/contexts";

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return auth.accessToken !== "" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
