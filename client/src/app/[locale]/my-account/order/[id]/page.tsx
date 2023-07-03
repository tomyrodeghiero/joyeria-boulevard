"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function Page({ params }: { params: { id: string } }) {
  const products = [
    { name: "Producto 1", price: 100 },
    { name: "Producto 2", price: 200 },
    // agregar más productos si es necesario
  ];

  const subtotal = products.reduce(
    (total, product) => total + product.price,
    0
  );
  const shipping = 20; // Cambiar por el valor real del envío
  const total = subtotal + shipping;

  return (
    <main className="flex min-h-screen flex-col lg:py-10 lg:px-16 px-4 py-5 bg-white">
      <Navbar />

      <div className="flex mt-16 flex-grow gap-4">
        <div className="w-[55%] min-h-[70vh]">
          <h1 className="text-xl">Detalles del Pedido</h1>

          <div className="grid mt-5 grid-cols-2 gap-4">
            <div>
              <div className="mb-8">
                <p className="uppercase mb-1">Numero de orden</p>
                <p className="text-gray-700">{params.id}</p>
              </div>

              <div className="mb-8">
                <p className="uppercase mb-1">Email del comprador</p>
                <p className="text-gray-700">comprador@example.com</p>
              </div>

              <div>
                <p className="uppercase mb-1">Fecha</p>
                <p className="text-gray-700">01/01/2023</p>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <p className="uppercase mb-1">Opciones de Entrega</p>
                <p className="text-gray-700">Encomienda</p>
              </div>

              <div className="mb-8">
                <p className="uppercase mb-1">Dirección de Entrega</p>
                <p className="text-gray-700 mb-1">Alvear 721</p>
                <p className="text-gray-700 mb-1">Argentina</p>
                <p className="text-gray-700">Río Cuarto, Córdoba</p>
              </div>

              <div>
                <p className="uppercase mb-1">Número de Contacto</p>
                <p className="text-gray-700">+54 9 358 123456789</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[45%]">
          <h2 className="text-xl mb-4">Resumen del Pedido</h2>
          <div className="bg-gray-300 py-8 px-10">
            <div className="flex border-b border-gray-400 pb-5 justify-between text-[0.95rem] uppercase">
              <p>Producto</p>
              <p>Total</p>
            </div>

            <div className="border-b border-gray-400">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between my-6 text-[0.95rem] text-gray-700"
                >
                  <span>{product.name}</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex border-b border-gray-400 py-5 justify-between text-[0.95rem] uppercase">
              <p>Subtotal</p>
              <p className="text-gray-700">${subtotal}</p>
            </div>

            <div className="flex border-b border-gray-400 py-5 justify-between text-[0.95rem]">
              <p className="uppercase">Envío</p>
              <p className="text-gray-700">Envío gratuito</p>
            </div>

            <div className="flex pt-5 font-medium justify-between text-[0.95rem]">
              <p className="uppercase">Total</p>
              <p>${total}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
