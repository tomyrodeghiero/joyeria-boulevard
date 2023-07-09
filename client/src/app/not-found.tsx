// This page renders when a route is requested that doesn't match the
// middleware and therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center lg:py-10 lg:px-16 px-4 py-5 bg-white">
      <div className="justify-center flex flex-col items-center">
        <h1 className="text-3xl">Error 404 | Página no encontrada</h1>
        <p className="mt-3 text-gray-700">
          Lo sentimos, pero la página que estás buscando no existe o ha sido
          movida.
        </p>
        <p className="text-gray-700">
          Por favor, regresa a la página de inicio y trata de navegar nuevamente
          desde allí.
        </p>
      </div>
    </main>
  );
}
