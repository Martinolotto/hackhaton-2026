import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/auth";

export default function PublicOnlyRoute() {
  const { session, loading } = useAuth();
  const location = useLocation();
  const destination = location.state?.from?.pathname ?? "/dashboard";

  if (loading) {
    return <p>Cargando sesión...</p>;
  }

  if (session) {
    return <Navigate replace to={destination} />;
  }

  return <Outlet />;
}
