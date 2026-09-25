import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/auth";
import { handleLogout } from "../services/handleLogout";
import "../../pages/home/homePrueba.css";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const forumDestination = user ? "/foro" : "/login";

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const handleForumClick = (event) => {
    if (!user) {
      event.preventDefault();
      navigate("/login");
    }
  };

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await handleLogout();
    } catch {
      setLogoutError("No se pudo cerrar sesión. Intentá nuevamente.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="hp-header">
      <nav className="hp-nav" aria-label="Navegación principal">
        <Link
          className="hp-wordmark"
          to="/home-prueba"
          aria-label="A tiempo, inicio"
        >
          <span className="hp-wordmark-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          A tiempo
        </Link>

        <div className="hp-desktop-nav">
          <Link to="/aprendizaje">Aprendizaje</Link>
          <Link to="/analizar-datos">Analizar datos</Link>
          <Link to={forumDestination} onClick={handleForumClick}>Foro</Link>
          {user ? (
            <button
              className="hp-primary hp-nav-primary hp-logout"
              type="button"
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>
          ) : (
            <>
              <Link to="/login">Ingresar</Link>
              <Link className="hp-primary hp-nav-primary" to="/register">
                Crear cuenta
              </Link>
            </>
          )}
        </div>

        <button
          className="hp-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="hp-mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </nav>

      {logoutError && (
        <p className="hp-logout-error" role="alert">
          {logoutError}
        </p>
      )}

      <div
        className="hp-mobile-menu"
        id="hp-mobile-menu"
        hidden={!isMenuOpen}
      >
        <Link to="/aprendizaje" onClick={closeMenu}>
          Aprendizaje
        </Link>
        <Link to="/analizar-datos" onClick={closeMenu}>
          Analizar datos
        </Link>
        <Link
          to={forumDestination}
          onClick={(event) => {
            closeMenu();
            handleForumClick(event);
          }}
        >
          Foro
        </Link>
        <a href="#situaciones" onClick={closeMenu}>
          Situaciones
        </a>
        <a href="#como-funciona" onClick={closeMenu}>
          Cómo funciona
        </a>
        {user ? (
          <button
            className="hp-primary hp-logout"
            type="button"
            onClick={() => {
              closeMenu();
              handleLogoutClick();
            }}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
          </button>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>
              Ingresar
            </Link>
            <Link className="hp-primary" to="/register" onClick={closeMenu}>
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
