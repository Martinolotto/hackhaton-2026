import { Link } from "react-router";
import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";

export default function Nav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="flex items-center justify-between border-b border-border bg-background px-4 py-3 sm:px-6"
    >
      <Link
        to="/"
        className="text-base font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Inicio
      </Link>

      <div className="flex items-center gap-2">
        <Link to="/login" className={cn(buttonVariants({ variant: "ghost" }))}>
          Ingresar
        </Link>
        <Link to="/register" className={cn(buttonVariants())}>
          Crear cuenta
        </Link>
      </div>
    </nav>
  );
}
