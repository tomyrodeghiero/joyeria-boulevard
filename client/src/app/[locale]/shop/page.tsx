"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ProductFilterSidebar } from "@/components/product-filter-sidebar/ProductFilterSidebar";
import WhatsApp from "@/components/whatsaap/WhatsApp";
import Link from "next/link";
import { formatPriceARS } from "@/utils/functions";
import SearchBar from "@/components/search-bar/SearchBar";
import { useSearchParams } from "next/navigation";
import { NoResults } from "@/components/no-results/NoResults";

const ProductDisplay = ({ products, resetFilters }: any) => {
  return (
    <div className="w-full mt-5 lg:mt-0">
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 w-full lg:grid-cols-3 gap-y-12 gap-5 lg:gap-7">
          {products.map((product: any) => (
            <div className="product-card group rounded relative transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
              <Link
                href={`/product/${product._id}`}
                key={product._id}
                className="flex flex-col text-left"
              >
                <div className="relative">
                  <img
                    className="h-60 lg:h-80 w-full object-cover rounded-lg"
                    src={product.mainImageUrl}
                    alt={product.name}
                  />
                  <span className="product-tag text-[0.9rem] text-black text-center font-medium uppercase absolute bottom-0 left-0 right-0 bg-gray-100 py-3 px-4 opacity-0 group-hover:opacity-60">
                    Ver producto
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
      ) : (
        <NoResults onEditSearch={resetFilters} />
      )}
    </div>
  );
};

export default function Page({ params }: any) {
  const searchParams = useSearchParams();
  const searchQueryParam = searchParams.get("search");
  const categoryQueryParam = searchParams.get("category");

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOnSale, setIsOnSale] = useState(false);
  const [isOnStock, setIsOnStock] = useState(true);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchQueryParam || "");
  const [sortByCategory, setSortByCategory] = useState(
    categoryQueryParam || ""
  );

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
      setIsLoading(false);
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
    } else {
      tempProducts = tempProducts.filter((product: any) => product.stock <= 0);
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
    searchQueryParam,
    categoryQueryParam,
  ]);

  const resetFilters = () => {
    setIsOnSale(false);
    setIsOnStock(true);
    setPriceRange([0, Infinity]);
    setSortByPrice("");
    setSortByCategory("");
    setSearchQuery("");
  };

  if (isLoading) return null;

  return (
    <main className="flex min-h-screen flex-col lg:py-10 lg:px-16 px-4 py-5 bg-white">
      <Navbar />
      <SearchBar />
      <h2 className="font-medium text-[1.5rem] my-5 lg:mt-14 mb-4">Tienda</h2>
      <div className="lg:flex gap-10">
        <ProductFilterSidebar
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onSortByPrice={setSortByPrice}
          onSortByCateogory={setSortByCategory}
          isOnSale={isOnSale}
          setIsOnSale={setIsOnSale}
          isOnStock={isOnStock}
          setIsOnStock={setIsOnStock}
          onPriceChange={setPriceRange}
          onResetFilters={resetFilters}
        />
        <ProductDisplay
          resetFilters={resetFilters}
          products={filteredProducts}
        />
      </div>
      <WhatsApp />
      <Footer />
    </main>
  );
}
