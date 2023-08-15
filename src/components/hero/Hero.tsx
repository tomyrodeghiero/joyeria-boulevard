"use client";
import React, { useState, useEffect } from "react";
import { MAIN_PRODUCTS } from "@/data/products";
import SearchBar from "../search-bar/SearchBar";
import { Carousel } from "react-responsive-carousel";
import CategoryTab from "../category-tab/CategoryTab";

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
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative w-full lg:h-[77.5vh] rounded-lg overflow-hidden">
      <Carousel
        className="mt-4 custom-carousel"
        showThumbs={false}
        emulateTouch={true}
        showArrows={false}
        showStatus={false}
        showIndicators={false} // disable built-in indicators
        selectedItem={current} // sync Carousel with current state
        onChange={handleSelect} // update current index on slide change
        infiniteLoop={true}
      >
        {MAIN_PRODUCTS.map((image: any, index: number) => (
          <div key={image.id} className="w-full lg:h-[120vh] flex-shrink-0">
            <img
              src={image.image}
              alt={`product-image-${index}`}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </Carousel>
      <div className="absolute bottom-8 w-full flex justify-center items-center space-x-2">
        {MAIN_PRODUCTS.map((product, index) => (
          <button
            key={product.id}
            className={`rounded-full border border-white ${
              current === index ? "bg-transparent h-3 w-3" : "bg-white h-2 w-2"
            }`}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
