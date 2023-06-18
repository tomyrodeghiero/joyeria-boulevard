"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import OrderTable from "@/components/order-table/OrderTable";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("description");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col py-14 px-16">
      <Navbar />
      <div className="flex border-b border-gray-300 mt-16">
        <button
          className={`px-12 py-5 ${
            activeTab === "description"
              ? "border-b-2 border-black"
              : "text-gray-700"
          }`}
          onClick={() => handleTabClick("orders")}
        >
          Órdenes
        </button>

        <button className="px-12 py-5 text-gray-700" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {/* Orders */}
      <div className="my-4 min-h-[50vh]">
        <OrderTable />
      </div>
      <Footer />
    </main>
  );
};

export default Page;
