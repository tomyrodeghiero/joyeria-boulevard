import { NoResults } from "@/components/no-results/NoResults";
import { SHOPPING_CART } from "@/utils/constants";
import { formatPriceARS } from "@/utils/functions";
import Link from "next/link";

export const ProductsDisplay = ({ products, resetFilters }: any) => {
  return (
    <div className="w-full mt-5 lg:mt-0 mb-5">
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 w-full lg:grid-cols-3 gap-y-12 gap-5 lg:gap-7">
          {products.map((product: any) => (
            <div className="product-card group rounded relative transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
              <Link
                href={`/product/${product._id}`}
                key={product._id}
                className="flex flex-col text-left"
              >
                <div className="relative">
                  <img
                    className="h-60 lg:h-80 w-full object-cover rounded-lg"
                    src={product.mainImageUrl}
                    alt={product.name}
                  />

                  <div className="product-tag absolute bottom-0 left-0 right-0 bg-gray-300 py-3 px-4 opacity-0 group-hover:opacity-60 flex items-center justify-center">
                    <img
                      alt="product"
                      src={SHOPPING_CART}
                      className="h-5 mr-2"
                    />
                    <span className="text-[0.9rem] text-black font-medium uppercase">
                      Ver producto
                    </span>
                  </div>
                </div>
                <h3 className="mt-3 lg:text-[1.2rem] lg:mt-4 text-lg">
                  {product.name}
                </h3>
                <p className="mt-2 lg:mt-3 text-yellow-800">
                  {formatPriceARS(product.price)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <NoResults onEditSearch={resetFilters} />
      )}
    </div>
  );
};
