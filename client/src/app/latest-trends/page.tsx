"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ProductFilterSidebar } from "@/components/product-filter-sidebar/ProductFilterSidebar";
import WhatsApp from "@/components/whatsaap/WhatsApp";
import Link from "next/link";

const ProductDisplay = ({ products }: any) => {
  return (
    <div className="grid grid-cols-3 gap-y-20 gap-12">
      {products.map((product: any) => (
        <Link
          key={product._id}
          className="flex flex-col text-left"
          href={`/product/${product._id}`}
        >
          <img
            className="h-96 w-full object-cover rounded-lg"
            src={product.imageUrl}
            alt={product.name}
          />
          <h3 className="mt-4 text-lg">{product.name}</h3>
          <p className="mt-2 text-yellow-800">${product.price}</p>
        </Link>
      ))}
    </div>
  );
};

const LatestTrends = () => {
  const [products, setProducts] = useState([]);
  const [isOnSale, setIsOnSale] = useState(false);
  const [isOnStock, setIsOnStock] = useState(false);

  // Function to fetch products
  async function getProducts(): Promise<any> {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch("/api/products", requestOptions);

      console.log("response", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (
        !response.headers.get("Content-Type")?.includes("application/json")
      ) {
        throw new Error(
          `Invalid content type. Expected application/json but received ${response.headers.get(
            "Content-Type"
          )}`
        );
      }

      const productsDB = await response.json();
      console.log("productsDB: ", productsDB);

      // set the ordered chat history instead of setting it
      setProducts(productsDB);
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col py-14 px-16">
      <Navbar />
      <h2 className="font-medium text-[1.5rem] mt-20 mb-6">
        Las Últimas Tendencias
      </h2>
      <div className="flex gap-10">
        <ProductFilterSidebar
          onSearch={undefined}
          onSort={undefined}
          onCategory={undefined}
          isOnSale={isOnSale}
          setIsOnSale={setIsOnSale}
          isOnStock={isOnStock}
          setIsOnStock={setIsOnStock}
        />
        <ProductDisplay products={products} />
      </div>
      <WhatsApp />
      <Footer />
    </main>
  );
};

export default LatestTrends;
