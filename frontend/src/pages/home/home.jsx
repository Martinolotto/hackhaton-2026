import Nav from "../../components/navegation/nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto flex min-h-[calc(100vh-57px)] max-w-5xl items-center px-4 py-16 sm:px-6">
        <section className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Bienvenido
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Ingresá a tu cuenta o creá una nueva para comenzar.
          </p>
        </section>
      </main>
    </div>
  );
}
