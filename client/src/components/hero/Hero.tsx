"use client";

import React, { useState, useEffect } from "react";
import { MAIN_PRODUCTS } from "@/data/products";

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
    <div className="mt-5 relative w-full h-[75vh] overflow-hidden mb-8">
      <div
        className="absolute top-0 left-0 w-full h-[75vh] flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {MAIN_PRODUCTS.map((product) => (
          <div key={product.id} className="w-full h-[75vh] flex-shrink-0">
            <img
              className="object-cover w-full rounded-lg h-full"
              src={product.image}
              alt={product.name}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 w-full flex justify-center space-x-2">
        {MAIN_PRODUCTS.map((product, index) => (
          <button
            key={product.id}
            className={`w-3 h-3 rounded-full border border-white ${
              current === index ? "bg-white" : "bg-transparent"
            }`}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
