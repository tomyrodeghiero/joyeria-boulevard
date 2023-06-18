"use client";
import React, { useState, useEffect } from "react";
import { MAIN_PRODUCTS } from "@/data/products";
import SearchBar from "../search-bar/SearchBar";

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((current + 1) % MAIN_PRODUCTS.length);
  };

  const handleSelect = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7500);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="mt-5 relative w-full lg:h-[75vh] overflow-hidden mb-8">
      <SearchBar />
      <div
        className="lg:absolute lg:top-0 lg:left-0 w-full lg:h-[100vh] flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {MAIN_PRODUCTS.map((product) => (
          <div key={product.id} className="w-full lg:h-[120vh] flex-shrink-0">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={product.image}
              alt={product.name}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 w-full flex justify-center items-center space-x-2">
        {MAIN_PRODUCTS.map((product, index) => (
          <button
            key={product.id}
            className={`rounded-full border border-white ${
              current === index
                ? "bg-transparent lg:h-4 h-3 lg:w-4 w-3"
                : "bg-white lg:h-3 h-2 lg:w-3 w-2"
            }`}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
