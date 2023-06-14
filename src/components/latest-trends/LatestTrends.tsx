import React from "react";
import { PRODUCTS } from "@/data/products";

const LatestTrends = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-medium text-[1.3rem]">Las Últimas Tendencias</h2>
        <h5 className="font-medium text-yellow-800 text-[0.9rem]">Ver Todas</h5>
      </div>

      <div className="grid grid-cols-3 gap-y-20 gap-12">
        {PRODUCTS.map((product: any) => (
          <div key={product.id} className="flex flex-col text-left">
            <img
              className="h-96 w-full object-cover rounded-lg"
              src={product.image}
              alt={product.name}
            />
            <h3 className="mt-4 text-lg">{product.name}</h3>
            <p className="mt-2 text-yellow-800">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTrends;
