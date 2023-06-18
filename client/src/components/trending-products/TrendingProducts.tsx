"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const TrendingProducts = () => {
  const [products, setProducts] = useState<any>([]);

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
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-medium text-[1.3rem]">Las Últimas Tendencias</h2>
        <Link
          href="/latest-trends"
          className="font-medium text-yellow-800 text-[0.9rem]"
        >
          Ver Todas
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20 gap-8 lg:gap-12">
        {products.map((product: any) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="flex flex-col text-left"
          >
            <img
              className="h-96 w-full object-cover rounded-lg"
              src={product.mainImageUrl}
              alt={product.name}
            />
            <h3 className="mt-4 text-lg">{product.name}</h3>
            <p className="mt-2 text-yellow-800">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
