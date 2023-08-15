import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="product-card group rounded relative transition-transform duration-300 ease-in-out transform">
      <div className="flex flex-col text-left">
        <div className="relative">
          <div className="h-48 lg:h-96 w-full object-cover rounded-lg bg-gray-400 animate-pulse"></div>
          <span className="product-tag text-[0.9rem] text-black text-center font-medium uppercase absolute bottom-0 left-0 right-0 bg-gray-300 py-3 px-4 opacity-0 group-hover:opacity-60"></span>
        </div>
        <div className="mt-3 lg:text-[1.2rem] lg:mt-4 text-lg h-5 bg-gray-300 animate-pulse"></div>
        <div className="mt-2 lg:mt-3 text-yellow-800 h-4 w-1/2 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
