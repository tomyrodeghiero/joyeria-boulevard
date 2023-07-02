"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(true); // New loading state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("authenticated") === "true"
    ) {
      router.push("/my-account/admin");
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("response", response);

    // If the fetch request is successful (HTTP status code 200), navigate to the home page
    if (response.ok) {
      router.push("/my-account/admin");
      localStorage.setItem("authenticated", "true");
    } else {
      alert(data.error);
    }
  };

  // If it's loading, return null or some loading indicator
  if (loading) return null;

  return (
    <main className="flex flex-col min-h-screen py-4 sm:py-6 lg:py-14 px-4 lg:px-16">
      <Navbar />
      <div className="flex flex-col text-black px-5 py-6 sm:py-10 lg:py-20">
        <h1 className="text-xl sm:text-2xl lg:text-2xl text-center">
          Mi Cuenta
        </h1>
        <p className="mt-4 sm:mt-6 lg:mt-8 text-center">
          Ingrese sus credenciales para acceder a su Cuenta
        </p>

        <div className="mt-4 sm:mt-6 lg:mt-8 lg:mx-auto w-full sm:w-full lg:w-[28rem]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-6 lg:gap-12"
          >
            <input
              className="py-2 px-3 border-b w-full"
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="py-2 px-3 border-b w-full"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center mb-5 lg:mb-0 mt-2 lg:mt-0">
              <button
                type="submit"
                className="bg-black text-xs sm:text-sm rounded lg:text-[0.9rem] roune py-2 lg:py-3 w-full uppercase text-center text-white"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
