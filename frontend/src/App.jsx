import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import AuthInterface from "./pages/auth/authInterface";
import LoginInterface from "./pages/auth/login/login-interface";
import EvaluationInterface from "./pages/evaluation/evaluation-interface";
import Educacion from "./pages/Educacion preventiva/educacion";
import Foro from "./pages/Foro/foro";
import HomePrueba from "./pages/home/homePrueba";
import ProtectedRoute from "./routes/protectedRoute";
import PublicOnlyRoute from "./routes/publicOnlyRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

          <Routes>
            <Route path="/" element={<HomePrueba />} />
            <Route path="/home-prueba" element={<HomePrueba />} />
            <Route path="/aprendizaje" element={<Educacion />} />
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginInterface />} />
              <Route path="/register" element={<AuthInterface />} />
            </Route>

            <Route element={<ProtectedRoute/>}>
              <Route path="/evaluar" element={<EvaluationInterface />} />
              <Route path="/analizar-datos" element={<Navigate replace to="/evaluar" />} />
              <Route path="/dashboard" element={<Navigate replace to="/evaluar" />} />
              <Route path="/foro" element={<Foro />} />
            </Route>

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
