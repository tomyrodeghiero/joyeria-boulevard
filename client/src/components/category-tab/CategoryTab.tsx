"use client";
import { CATEGORIES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import React from "react";

const CategoryTab = () => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/shop?category=${category}`);
  };

  return (
    <div className="flex gap-3 overflow-x-scroll hide-scrollbar lg:hidden lg:overflow-visible">
      {CATEGORIES.map((category, index) => (
        <button
          key={index}
          className="flex items-center justify-center bg-white rounded text-[0.9rem] border-gray-400 hover:border-yellow-800 border py-2 min-w-[9rem]"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTab;
