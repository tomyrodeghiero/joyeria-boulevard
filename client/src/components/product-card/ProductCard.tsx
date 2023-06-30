"use client";
import { REMOVE_ICON } from "@/utils/constants";
import React, { useState } from "react";

interface Product {
  mainImageUrl: string | undefined;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Props {
  product: Product;
  increment: () => void;
  decrement: () => void;
  remove: () => void;
}

const ProductCard: React.FC<Props> = ({
  product,
  increment,
  decrement,
  remove,
}) => {
  return (
    <div className="flex w-full lg:gap-8 gap-4 my-9 pb-9 border-b border-gray-400 relative">
      {/* Product image */}
      <img
        src={product.mainImageUrl}
        alt={product.name}
        className="h-44 w-44 rounded object-cover"
      />

      {/* Product name and price */}
      <div className="flex flex-col justify-between lg:flex w-full">
        <div className="">
          <div className="flex justify-between">
            <h3 className="lg:text-xl">{product.name}</h3>
            <button className="top-2 right-2" onClick={remove}>
              <img className="h-3" src={REMOVE_ICON} alt="Remove" />
            </button>
          </div>
          <p className="text-yellow-800 mt-2">${product.price}</p>
        </div>

        {/* Quantity controls */}
        <div className="w-24 text-gray-700 flex justify-between items-center gap-2 bg-gray-300 p-2 rounded">
          <button className="px-2" onClick={decrement}>
            -
          </button>
          <span className="w-8 text-center" onClick={increment}>
            {product.quantity}
          </span>
          <button className="px-2">+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
