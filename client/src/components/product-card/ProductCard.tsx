"use client";
import { REMOVE_ICON } from "@/utils/constants";
import React, { useState } from "react";

interface Product {
  name: string;
  price: number;
  image: string;
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
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    increment();
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      decrement();
    }
  };

  return (
    <div className="flex items-start gap-8 my-9 pb-9 border-b border-gray-400 relative">
      {/* Product image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-1/4 object-cover"
      />

      {/* Product name and price */}
      <div className="w-1/3 ml-2">
        <h3 className="text-xl">{product.name}</h3>
        <p className="text-yellow-800">${product.price}</p>
      </div>

      {/* Quantity controls */}
      <div className="w-[15%] text-gray-700 flex justify-between items-center gap-2 bg-gray-300 p-2 py-[0.65rem] rounded">
        <button onClick={handleDecrement} className="px-2">
          -
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button onClick={handleIncrement} className="px-2">
          +
        </button>
      </div>

      {/* Remove button */}
      <button onClick={remove} className="absolute top-2 right-2">
        <img className="h-3" src={REMOVE_ICON} alt="Remove" />
      </button>
    </div>
  );
};

export default ProductCard;
