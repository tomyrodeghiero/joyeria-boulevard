"use client";
import { CATEGORIES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const CategoryTab = () => {
  const router = useRouter();
  const scrollContainerRef = useRef(null);

  const handleCategoryClick = (category: string) => {
    router.push(`/shop?category=${category}`);
  };

  useEffect(() => {
    const container: any = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: any;
    let startTime: any;
    let direction = 1;

    const animateScroll = (timestamp: any) => {
      if (!startTime) startTime = timestamp;

      const elapsed: any = timestamp - startTime;

      container.scrollLeft += direction * 0.5; // Ajusta este valor para cambiar la velocidad

      // Cambia la dirección si hemos alcanzado un extremo
      if (
        container.scrollLeft >= container.scrollWidth - container.offsetWidth ||
        container.scrollLeft === 0
      ) {
        direction *= -1;
      }

      // Repite la animación cada ciertos milisegundos
      if (elapsed < 5000) {
        // Ajusta este valor para cambiar la duración total de la animación
        animationFrameId = requestAnimationFrame(animateScroll);
      }
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="category flex gap-3 items-center h-full my-4 overflow-x-scroll py-0 lg:hidden"
    >
      {CATEGORIES.map((category, index) => (
        <button
          key={index}
          className="flex items-center justify-center bg-white rounded text-[0.9rem] border-gray-400 hover:border-yellow-800 border py-[0.7rem] min-w-[9rem]"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTab;
