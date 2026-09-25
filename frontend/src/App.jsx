import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import AuthInterface from "./pages/auth/authInterface";
import LoginInterface from "./pages/auth/login/login-interface";
import DashboardInterface from "./pages/dashboard/dashboard-interface";
import Analizador from "./pages/Analisis/analizador";
import Educacion from "./pages/Educacion preventiva/educacion";
import Foro from "./pages/Foro/foro";
import HomePrueba from "./pages/home/homePrueba";
import ProtectedRoute from "./routes/protectedRoute";
import PublicOnlyRoute from "./routes/publicOnlyRoute";
import { PageCurtainStage } from "./components/motion-ui/page-curtain";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

          <Routes>
            <Route path="/" element={<HomePrueba />} />
            <Route path="/home-prueba" element={<HomePrueba />} />
            <Route path="/analizar-datos" element={<Analizador />} />
            <Route path="/aprendizaje" element={<Educacion />} />
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginInterface />} />
              <Route path="/register" element={<AuthInterface />} />
            </Route>

            <Route element={<ProtectedRoute/>}>
              <Route path="/dashboard" element={<DashboardInterface />} />
              <Route path="/foro" element={<Foro />} />
            </Route>

            <Route path="*" element={<Navigate replace to="/dashboard" />} />
          </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}
