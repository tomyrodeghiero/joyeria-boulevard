"use client";

import { formatPriceARS } from "@/utils/functions";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TrendingProducts = ({
  setProductsLoaded,
}: {
  setProductsLoaded: (value: boolean) => void;
}) => {
  const t = useTranslations("TrendingProducts");

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
      setProductsLoaded(true);
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
      <div className="flex justify-between items-center my-5 lg:my-8">
        <h2 className="animate-underline cursor-pointer font-medium text-[1.1rem] lg:text-[1.5rem]">
          {t("LatestTrends")}
        </h2>
        <Link
          href="/shop"
          className="border-button px-5 rounded py-2 font-medium text-yellow-800 text-[0.95rem] lg:text-[1.1rem]"
        >
          {t("ViewAll")}
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20 gap-8 lg:gap-12">
        {products.map((product: any) => (
          <div className="product-card group rounded relative transition-transform duration-300 ease-in-out transform hover:-translate-y-3">
            <Link
              href={`/product/${product._id}`}
              key={product._id}
              className="flex flex-col text-left"
            >
              <div className="relative">
                <img
                  className="h-48 lg:h-96 w-full object-cover rounded-lg"
                  src={product.mainImageUrl}
                  alt={product.name}
                />
                <span className="product-tag text-[0.9rem] text-black text-center font-medium uppercase absolute bottom-0 left-0 right-0 bg-gray-100 py-3 px-4 opacity-0 group-hover:opacity-60">
                  {t("ViewProduct")}
                </span>
              </div>
              <h3 className="mt-3 lg:text-[1.2rem] lg:mt-4 text-lg">
                {product.name}
              </h3>
              <p className="mt-2 lg:mt-3 text-yellow-800">
                {formatPriceARS(product.price)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
