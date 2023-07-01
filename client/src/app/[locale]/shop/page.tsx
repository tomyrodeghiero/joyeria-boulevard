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
    <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 gap-y-12 gap-12">
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOnSale, setIsOnSale] = useState(false);
  const [isOnStock, setIsOnStock] = useState(false);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByCategory, setSortByCategory] = useState("");

  // Function to fetch products
  async function getProducts(): Promise<any> {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let url = "/api/products";

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
      setProducts(productsDB);
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let tempProducts = products;

    // Filter products on sale
    if (isOnSale) {
      tempProducts = tempProducts.filter((product: any) => product.isOnSale);
    }

    // Filter products in stock
    if (isOnStock) {
      tempProducts = tempProducts.filter((product: any) => product.stock > 0);
    }

    // Filter products within price range
    tempProducts = tempProducts.filter(
      (product: any) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter products by search query
    if (searchQuery) {
      tempProducts = tempProducts.filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter products by category
    if (sortByCategory) {
      tempProducts = tempProducts.filter(
        (product: any) =>
          product.category.toLowerCase() === sortByCategory.toLowerCase()
      );
    }

    // Sort products
    switch (sortByPrice) {
      case "Menor precio":
        tempProducts.sort((a: any, b: any) => a.price - b.price);
        break;
      case "Mayor precio":
        tempProducts.sort((a: any, b: any) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(tempProducts);
  }, [
    products,
    isOnSale,
    isOnStock,
    priceRange,
    sortByPrice,
    sortByCategory,
    searchQuery,
  ]);

  return (
    <main className="flex min-h-screen flex-col py-5 lg:py-14 px-4 lg:px-16">
      <Navbar />
      <SearchBar />
      <h2 className="font-medium text-[1.5rem] lg:mt-20 mb-6">Tienda</h2>
      <div className="flex gap-10">
        <ProductFilterSidebar
          onSearch={setSearchQuery}
          onSortByPrice={setSortByPrice}
          onSortByCateogory={setSortByCategory}
          isOnSale={isOnSale}
          setIsOnSale={setIsOnSale}
          isOnStock={isOnStock}
          setIsOnStock={setIsOnStock}
          onPriceChange={setPriceRange}
        />
        <ProductDisplay products={filteredProducts} />
      </div>
      <WhatsApp />
      <Footer />
    </main>
  );
};

export default LatestTrends;
