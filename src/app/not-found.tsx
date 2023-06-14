"use client";

import React from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();
  const toMainPage = () => {
    router.push("/");
  };

  return (
    <main className="flex h-screen w-screen justify-between flex-col py-14 px-16">
      <Navbar />
      <div className="justify-center flex flex-col items-center">
        <h1 className="text-3xl">404 ERROR</h1>
        <p className="mt-3 text-gray-700 text-[0.9rem]">This page not found;</p>
        <p className="text-gray-700 text-[0.9rem]">
          back to home and start again
        </p>

        <button
          onClick={toMainPage}
          className="bg-white border py-2 text-[0.85rem] font-medium px-10 border-black rounded mt-12 uppercase"
        >
          Homepage
        </button>
      </div>
      <Footer />
    </main>
  );
};

export default Custom404;
