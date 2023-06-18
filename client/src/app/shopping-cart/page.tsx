"use client";
import React, { useState } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ProductCard from "@/components/product-card/ProductCard";
import WhatsApp from "@/components/whatsaap/WhatsApp";

const Page = () => {
  const [products, setProducts] = useState([
    {
      name: "Producto 1",
      price: 10.99,
      image: "/assets/data/product-01.png",
      quantity: 1,
    },
    {
      name: "Producto 2",
      price: 99.05,
      image: "/assets/data/product-01.png",
      quantity: 1,
    },
    {
      name: "Producto 3",
      price: 23.52,
      image: "/assets/data/product-01.png",
      quantity: 1,
    },
  ]);

  // New state variable
  const [shippingDetailsOpen, setShippingDetailsOpen] = useState(false);

  const increment = (index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const decrement = (index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const remove = (index: number) => {
    // Remueve el producto en la posición 'index'
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  // Calculate total
  const total = products
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <main className="flex justify-between flex-col py-14 px-16">
      <Navbar />
      <div className="mt-20 mb-16">
        <h1 className="text-2xl text-center">Shopping Cart</h1>
        {/* Cart */}
        <div className="flex justify-between gap-32">
          <div className="w-1/2">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                increment={() => increment(index)}
                decrement={() => decrement(index)}
                remove={() => remove(index)}
              />
            ))}

            <div className="flex justify-end mb-12">
              <button className="bg-white border py-3 text-[0.85rem] font-medium w-1/4 border-black rounded uppercase">
                Update totals
              </button>
            </div>
            <div className="flex justify-between gap-2">
              <input
                className="py-2 px-3 w-3/5 border-b"
                type="text"
                placeholder="Cupon Code"
              />
              <button className="bg-black text-white border py-3 text-[0.85rem] font-medium w-1/4 border-black rounded uppercase">
                Apply Cupon
              </button>
            </div>
          </div>
          <div className="w-1/2">
            {/* Contenido de la segunda mitad del div */}
            <div className="flex flex-col">
              <div className="border-b border-gray-400 pb-7">
                <h2 className="text-xl mb-7 mt-9">Cart Totals</h2>

                <div className="flex mb-4 text-[0.9rem]">
                  <p className="uppercase flex-1">Subtotal</p>
                  <p className="text-gray-700 flex-1">${total}</p>
                </div>

                <div className="flex mb-4 text-[0.9rem]">
                  <p className="uppercase flex-1">Shipping</p>
                  <p className="text-gray-700 flex-1">
                    Shipping costs will be calculated once you have provided
                    your address.
                  </p>
                </div>

                <div className="mt-4">
                  <h2
                    className="uppercase cursor-pointer"
                    onClick={() => setShippingDetailsOpen(!shippingDetailsOpen)}
                  >
                    Calculate Shipping
                  </h2>
                  {shippingDetailsOpen && (
                    <>
                      <select id="country" className="w-full mb-2">
                        <option>Select a country</option>
                        {/* Add other options */}
                      </select>

                      <select id="city" className="w-full mb-2">
                        <option>City</option>
                        {/* Add other options */}
                      </select>

                      <select id="postal-code" className="w-full mb-2">
                        <option>Postal code / Zip</option>
                        {/* Add other options */}
                      </select>

                      <button className="bg-white border py-2 text-[0.85rem] font-medium px-10 border-black rounded uppercase">
                        Update totals
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-between uppercase text-[0.9rem] font-medium pt-7 mb-4">
                <p>Total</p>
                <p>${total}</p>
              </div>

              <button className="bg-black text-[0.8rem] py-[0.65rem] mt-5 px-44 uppercase text-center text-white">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <WhatsApp />
      <Footer />
    </main>
  );
};

export default Page;
