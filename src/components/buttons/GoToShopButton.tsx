import Link from "next/link";
import React from "react";

const GoToShopButton = () => {
  return (
    <Link href="/shop" className="w-1/4">
      <button className="bg-black w-full hover:bg-white focus:outline-none focus:ring-1 focus:ring-gray-700 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:shadow-md hover:-translate-y-1 border border-black text-white hover:text-black py-3">
        Ir a la Tienda
      </button>
    </Link>
  );
};

export default GoToShopButton;
