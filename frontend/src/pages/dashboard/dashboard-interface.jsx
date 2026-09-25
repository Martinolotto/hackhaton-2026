import Nav from "@/components/navegation/nav";
import SplitText from "@/components/react-bits/textAparicionAnimations/SplitText";

function DashboardInterface() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />

      <main className="mx-auto flex min-h-[calc(100vh-66px)] w-full max-w-7xl flex-col items-center gap-6 p-4 text-center sm:p-8">
        <div className="w-full border border-black p-6 sm:p-10">
          <SplitText tag="h1" text="Dashboard" className="text-3xl font-semibold" />
          <p className="mt-3 text-sm">
            Inicio de sesión realizado correctamente.
          </p>
        </div>
      </main>
    </div>
  );
}

export default DashboardInterface;
