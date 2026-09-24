import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import AuthInterface from "./pages/auth/authInterface";
import LoginInterface from "./pages/auth/login/login-interface";
import DashboardInterface from "./pages/dashboard/dashboard-interface";
import Home from "./pages/home/home";
import ProtectedRoute from "./routes/protectedRoute";
import PublicOnlyRoute from "./routes/publicOnlyRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginInterface />} />
            <Route path="/register" element={<AuthInterface />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardInterface />} />
          </Route>

          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
