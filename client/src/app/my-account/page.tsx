import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const Contact = () => {
  return (
    <main className="flex min-h-screen flex-col py-14 px-16">
      <Navbar />
      <div className="flex flex-col text-black py-20">
        <h1 className="text-2xl text-center">Mi Cuenta</h1>
        <p className="mt-8 text-center">
          Ingrese sus credenciales para acceder a su Cuenta
        </p>

        <div className="mt-8 w-[28rem] mx-auto">
          <form className="flex flex-col gap-12">
            <input
              className="py-2 px-3 border-b"
              type="text"
              placeholder="Nombre de Usuario"
            />
            <input
              className="py-2 px-3 border-b"
              type="text"
              placeholder="Contaseña"
            />
          </form>

          <div className="flex justify-center mt-14">
            <button className="bg-black text-[0.9rem] py-3 w-full uppercase text-center text-white">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
