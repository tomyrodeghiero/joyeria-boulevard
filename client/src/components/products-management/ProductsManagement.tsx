"use client";

import { OPTIONS_ICON } from "@/utils/constants";
import { formatPriceARS } from "@/utils/functions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

const ProductsManagement = () => {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const dropdownRef = useRef<any>(null);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    }
  };

  const handleDelete = async (productId: string) => {
    const response = await fetch(`/api/delete-product/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchProducts();

      toast.success("1 producto ha sido eliminado.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      console.log("productId", productId);
      alert("Failed to delete product");
    }
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      router.push("/my-account");
    } else {
      fetchProducts();
    }
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 px-5 py-8">
      {products.map((product) => (
        <div
          className="bg-gray-200 shadow-sm rounded-lg p-4 relative"
          key={product._id}
        >
          <img
            src={OPTIONS_ICON}
            alt="Options"
            className="w-4 object-cover cursor-pointer absolute top-2 right-2"
            onClick={() => setSelectedProduct(product._id)}
          />
          {selectedProduct === product._id && (
            <div className="absolute right-0 mt-2 w-28 bg-white rounded-md overflow-hidden shadow-xl z-10">
              <Link
                href={`/my-account/admin/edit-product/${product._id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </Link>
              <a
                onClick={() => handleDelete(product._id)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Delete
              </a>
            </div>
          )}

          <img
            src={product.mainImageUrl}
            alt={product.name}
            className="w-40 mt-5 mx-auto rounded-full object-cover"
          />
          <div className="mt-5 flex flex-col items-center">
            <h3 className="font-bold text-[1.1rem]">{product.name}</h3>
            <p>{formatPriceARS(product.price)}</p>
          </div>
        </div>
      ))}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ProductsManagement;
