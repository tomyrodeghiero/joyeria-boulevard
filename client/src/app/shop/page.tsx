"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ProductFilterSidebar } from "@/components/product-filter-sidebar/ProductFilterSidebar";
import WhatsApp from "@/components/whatsaap/WhatsApp";
import Link from "next/link";
import { formatPriceARS } from "@/utils/function";
import SearchBar from "@/components/search-bar/SearchBar";

const ProductDisplay = ({ products }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-12">
      {products.map((product: any) => (
        <Link
          key={product._id}
          className="flex flex-col text-left"
          href={`/product/${product._id}`}
        >
          <img
            className="md:h-80 w-full object-cover rounded-lg"
            src={product.mainImageUrl}
            alt={product.name}
          />
          <h3 className="mt-4 text-lg">{product.name}</h3>
          <p className="mt-2 text-yellow-800">
            {formatPriceARS(product.price)}
          </p>
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
  async function getProducts(filters: any): Promise<any> {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let url = "/api/products";

    // Create query parameters from filters
    let queryParams = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join("&");

    if (queryParams) {
      url += "?" + queryParams;
    }

    try {
      const response = await fetch(url, requestOptions);

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
    getProducts({ isOnSale, isOnStock });
  }, [isOnSale, isOnStock]);

  return (
    <main className="flex min-h-screen flex-col py-5 lg:py-14 px-4 lg:px-16">
      <Navbar />
      <SearchBar />
      <h2 className="font-medium text-[1.5rem] lg:mt-20 mb-6">Tienda</h2>
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
