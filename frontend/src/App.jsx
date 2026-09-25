import { AnimatePresence } from "motion/react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";
import { BlurFade } from "./components/ui/blur-fade";
import { AuthProvider } from "./context/AuthContext";
import AuthInterface from "./pages/auth/authInterface";
import LoginInterface from "./pages/auth/login/login-interface";
import EvaluationInterface from "./pages/evaluation/evaluation-interface";
import Educacion from "./pages/Educacion preventiva/educacion";
import Foro from "./pages/Foro/foro";
import HomePrueba from "./pages/home/homePrueba";
import ProtectedRoute from "./routes/protectedRoute";
import PublicOnlyRoute from "./routes/publicOnlyRoute";

function AnimatedRoutes() {
  const location = useLocation();
  const routeKey = `${location.pathname}${location.search}`;

  return (
    <AnimatePresence initial={false} mode="wait">
      <BlurFade
        key={routeKey}
        className="min-h-dvh"
        duration={0.4}
        offset={8}
        direction="up"
        blur="8px"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePrueba />} />
          <Route path="/home-prueba" element={<HomePrueba />} />
          <Route path="/aprendizaje" element={<Educacion />} />
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginInterface />} />
            <Route path="/register" element={<AuthInterface />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/evaluar" element={<EvaluationInterface />} />
            <Route path="/analizar-datos" element={<Navigate replace to="/evaluar" />} />
            <Route path="/dashboard" element={<Navigate replace to="/evaluar" />} />
            <Route path="/foro" element={<Foro />} />
          </Route>

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BlurFade>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
