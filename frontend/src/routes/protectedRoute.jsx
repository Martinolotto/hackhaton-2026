import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/auth";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  
  const location = useLocation();

  if (loading) {
    return <p>Cargando sesión...</p>;
  }

  if (!session) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <Outlet />;
}
