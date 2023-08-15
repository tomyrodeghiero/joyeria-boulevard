"use client";
import React from "react";
import ProductCard from "@/components/product-card/ProductCard";
import { useCart } from "@/context/CartContext";
import { formatPriceARS } from "@/utils/functions";
import { EMPTY_CART } from "@/utils/constants";
import { useRouter } from "next/navigation";
import GoToShopButton from "@/components/buttons/GoToShopButton";

const Page = () => {
  const router = useRouter();
  // Calculate total
  type CartItem = {
    mainImageUrl: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  };

  const calculateTotal = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const { cart, increment, decrement, removeFromCart } = useCart();

  return (
    <main className="flex min-h-screen flex-col lg:py-8 lg:px-16 px-4 py-5 bg-white">
      <h1 className="text-3xl text-center pt-14 pb-8">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <div className="flex-col justify-center text-center items-center">
          <img className="h-80 w-full" src={EMPTY_CART} alt="Empty cart" />
          <h1 className="mt-8 text-[1.5rem]">Su Carrito está Vacío</h1>
          <p className="font-medium text-gray-500 mt-4">
            Parece que aún no has añadido Productos a tu Carrito
          </p>

          <div className="w-full flex justify-center items-center mt-8">
            <GoToShopButton />
          </div>
        </div>
      ) : (
        <div className="lg:flex justify-between gap-32">
          <div className="w-full lg:w-1/2">
            {cart.map((product: any, index: number) => (
              <ProductCard
                key={index}
                product={product}
                increment={() => increment(product.productId)}
                decrement={() => decrement(product.productId)}
                remove={() => removeFromCart(product.productId)}
              />
            ))}
          </div>
          <div className="lg:w-1/2">
            {/* Contenido de la segunda mitad del div */}
            <div className="flex flex-col">
              <h2 className="text-xl mb-7 mt-9">Su Compra</h2>

              <div className="bg-gray-300 w-full p-7 rounded">
                <div className="flex uppercase pb-5 border-b border-gray-400 justify-between">
                  <p>Producto</p>
                  <p className="text-right">Total</p>
                </div>

                {cart.map((product: any) => (
                  <div className="flex text-gray-700 py-8 justify-between">
                    <p>{product.name}</p>
                    <p className="text-right">
                      {formatPriceARS(product.price)}
                    </p>
                  </div>
                ))}

                <div className="flex uppercase pt-5 border-t border-gray-400 justify-between">
                  <p>Total</p>
                  <p className="text-right">
                    {formatPriceARS(calculateTotal(cart))}
                  </p>
                </div>

                <button
                  className="bg-black rounded text-[0.9rem] mt-8 w-full flex items-center justify-center py-3 uppercase text-center text-white"
                  onClick={async () => {
                    const response = await fetch("/api/create-order", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ cart }),
                    });

                    if (response.ok) {
                      const { init_point } = await response.json();
                      window.location.href = init_point;
                    } else {
                      alert("error");
                    }
                  }}
                >
                  Proceder a Pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
