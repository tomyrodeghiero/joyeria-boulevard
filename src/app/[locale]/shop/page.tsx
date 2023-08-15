"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductsDisplay } from "./products-display/ProductsDisplay";
import { ProductsFilterSidebar } from "@/components/products-filter-sidebar/ProductsFilterSidebar";
import Loader from "@/components/loader";
import { SEARCH_MOBILE_ICON } from "@/utils/constants";

export default function ShopPage({ params }: any) {
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

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Cambia esto según tus necesidades

  useEffect(() => {
    let tempProducts = products;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = tempProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    setFilteredProducts(currentProducts);

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
    currentPage,
  ]);

  const resetFilters = () => {
    setIsOnSale(false);
    setIsOnStock(true);
    setPriceRange([0, Infinity]);
    setSortByPrice("");
    setSortByCategory("");
    setSearchQuery("");
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-[1.5rem] my-5 lg:mt-14 mb-4">Tienda</h2>

      <div className="flex search mb-5 items-center bg-gray-300 rounded text-gray-700 lg:hidden py-2 px-4">
        <img className="h-4 mr-3" src={SEARCH_MOBILE_ICON} alt="Search" />
        <input
          type="text"
          className="flex-grow bg-transparent"
          placeholder="Buscar"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <div className="lg:flex gap-10">
        <ProductsFilterSidebar
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

        <div className="flex-col w-full">
          {isLoading ? (
            <Loader />
          ) : (
            <ProductsDisplay
              resetFilters={resetFilters}
              products={filteredProducts}
            />
          )}

          {filteredProducts.length > 0 && (
            <div className="flex justify-center my-5 lg:my-8 w-full">
              {[1, 2, 3].map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-4 py-2 mx-2 rounded ${
                    currentPage === pageNumber
                      ? "bg-black text-white"
                      : "bg-white border border-black"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
