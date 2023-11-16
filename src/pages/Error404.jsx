export default function Error404() {
    return (
      <>
      <div className="p-8">
        <main className="grid min-h-full shadow-lg place-items-center bg-white py-20 rounded-lg sm:py-32 lg:px-8  max-w-7xl mx-auto px-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-red-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página no encontrada</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Disculpe, no pudimos encontrar la página que estaba buscando.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/Home"
                className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </main>
        </div>
      </>
    )
  }