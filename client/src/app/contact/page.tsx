import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import WhatsApp from "@/components/whatsaap/WhatsApp";
import React from "react";

const Contact = () => {
  return (
    <main className="flex min-h-screen flex-col py-14 px-16">
      <Navbar />
      <div className="flex flex-col text-black py-20">
        <h1 className="text-2xl text-center">Contáctanos</h1>
        <p className="text-[0.9rem] mt-5 text-center">
          ¡Hola! Cuéntanos qué estás buscando o qué piensas de nuestros
          <br />
          productos y comparte tus ideas con nuestro equipo.
        </p>

        <div className="mt-8 px-56">
          <form className="grid grid-cols-2 gap-20">
            <input
              className="py-2 px-3 border-b"
              type="text"
              placeholder="Nombre"
            />
            <input
              className="py-2 px-3 border-b"
              type="text"
              placeholder="Apellido"
            />
            <input
              className="py-2 px-3 border-b"
              type="email"
              placeholder="Email"
            />
            <input
              className="py-2 px-3 border-b"
              type="text"
              placeholder="Asunto"
            />
            <textarea
              className="py-2 px-3 border-b col-span-2"
              placeholder="Mensaje"
              rows={4}
            />
          </form>

          <div className="flex justify-center mt-14">
            <button className="bg-black text-[0.8rem] py-2 px-44 uppercase text-center text-white">
              Enviar
            </button>
          </div>
        </div>
      </div>
      <WhatsApp />
      <Footer />
    </main>
  );
};

export default Contact;
