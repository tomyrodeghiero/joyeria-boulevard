"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import OrderTable from "@/components/order-table/OrderTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductsManagement from "@/components/products-management/ProductsManagement";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // New loading state
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("authenticated")
    ) {
      router.push("/my-account");
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.setItem("authenticated", "");
    router.push("/my-account");
  };

  // If it's loading, return null or some loading indicator
  if (loading) return null;

  return (
    <main className="flex min-h-screen flex-col lg:py-10 lg:px-16 px-4 py-5 bg-white">
      <Navbar />
      <div className="flex border-b border-gray-300 mt-16">
        <button
          className={`px-12 py-5 ${
            activeTab === "orders" ? "border-b-2 border-black" : "text-gray-700"
          }`}
          onClick={() => handleTabClick("orders")}
        >
          Órdenes
        </button>

        <button
          className={`px-12 py-5 ${
            activeTab === "management"
              ? "border-b-2 border-black"
              : "text-gray-700"
          }`}
          onClick={() => handleTabClick("management")}
        >
          Gestión de Productos
        </button>

        <button
          className={`px-12 py-5 ${
            activeTab === "addProduct"
              ? "border-b-2 border-black"
              : "text-gray-700"
          }`}
          onClick={() => handleTabClick("addProduct")}
        >
          Añadir Producto
        </button>

        <button className="px-12 py-5 text-gray-700" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {/* Orders */}
      {activeTab === "orders" && (
        <div className="my-4 min-h-[50vh]">
          <OrderTable />
        </div>
      )}

      {/* Product Management */}
      {activeTab === "management" && <ProductsManagement />}

      {/* Add Product */}
      {/* {activeTab === "addProduct" && <AddProduct />} */}

      <Footer />
    </main>
  );
};

export default Page;
