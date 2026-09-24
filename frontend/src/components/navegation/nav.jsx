import { Link } from "react-router";
import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";

export default function Nav({ variant = "default" }) {
  const isLanding = variant === "landing";

  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        "flex items-center justify-between",
        isLanding
          ? "landing-nav"
          : "border-b border-border bg-background px-4 py-3 sm:px-6",
      )}
    >
      <Link
        to="/"
        className={cn(
          "text-base font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2",
          isLanding
            ? "landing-wordmark"
            : "text-foreground focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        {isLanding ? "A tiempo" : "Inicio"}
      </Link>

      <div className={cn("flex items-center gap-2", isLanding && "landing-nav-actions")}>
        {isLanding && (
          <div className="landing-nav-links" aria-label="Secciones de la página">
            <a href="#evaluar">Evaluar</a>
            <a href="#aprender">Aprender</a>
          </div>
        )}
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            isLanding && "landing-login-link",
          )}
        >
          Ingresar
        </Link>
        <Link
          to="/register"
          className={cn(buttonVariants(), isLanding && "landing-nav-cta")}
        >
          Crear cuenta
        </Link>
      </div>
    </nav>
  );
}
