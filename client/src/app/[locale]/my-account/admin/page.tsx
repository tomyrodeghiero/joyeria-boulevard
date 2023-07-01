"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import OrderTable from "@/components/order-table/OrderTable";
import AddProduct from "@/components/add-product/AddProduct";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductsManagement from "@/components/products-management/ProductsManagement";

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      router.push("/my-account");
    }
  }, []);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.setItem("authenticated", "");
    router.push("/my-account");
  };

  return (
    <main className="flex min-h-screen flex-col py-14 px-16">
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
      {activeTab === "addProduct" && <AddProduct />}

      <Footer />
    </main>
  );
};

export default Page;
