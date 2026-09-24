import { useState } from "react";
import { handleLogout } from "@/components/services/handleLogout";

function DashboardInterface({ onLogout }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    setMessage("");

    try {
      await handleLogout(onLogout);
    } catch (error) {
      setMessage(error.message);
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="flex justify-end border border-black p-4">
        <button
          className="border border-black px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={handleLogoutClick}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Cerrando sesión..." : "Logout"}
        </button>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-66px)] w-full max-w-7xl flex-col items-center gap-6 p-4 text-center sm:p-8">
        <div className="w-full border border-black p-6 sm:p-10">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="mt-3 text-sm">
            Inicio de sesión realizado correctamente.
          </p>
          {message && (
            <p className="mt-4 border border-black p-3 text-sm" role="alert">
              {message}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default DashboardInterface;
