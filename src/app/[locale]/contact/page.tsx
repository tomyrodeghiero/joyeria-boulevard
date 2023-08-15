"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import WhatsApp from "@/components/whatsaap/WhatsApp";
import { PHONE_NUMBER } from "@/utils/constants";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { firstName, lastName, email, subject, message } = formData;

    const whatsappMessage = `
      ¡Hola! Soy ${firstName} ${lastName}. 
      Mi correo electrónico es ${email}.
      Tengo una consulta sobre ${subject}.
      ${message}

      ¡Gracias!
    `;

    window.open(
      `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="flex min-h-screen flex-col lg:py-10 lg:px-16 px-4 py-5 bg-white">
      <div className="flex flex-col text-black py-8 lg:py-20">
        <h1 className="text-2xl text-center">Contáctanos</h1>
        <p className="mt-5 text-center">
          ¡Hola! Cuéntanos qué estás buscando o qué piensas de nuestros
          productos y comparte tus ideas con nuestro equipo.
        </p>

        <div className="mt-8 lg:px-56">
          <form className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-20">
            <input
              className="py-2 px-3 border-b"
              type="text"
              name="firstName"
              placeholder="* Nombre"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              className="py-2 px-3 border-b"
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              className="py-2 px-3 border-b"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="py-2 px-3 border-b"
              type="text"
              name="subject"
              placeholder="Asunto"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              className="py-2 px-3 border-b col-span-full sm:col-span-full md:col-span-2 lg:col-span-2"
              name="message"
              placeholder="* Mensaje"
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
          </form>

          <div className="flex justify-center mt-14">
            <button
              className="bg-black text-[0.9rem] rounded py-3 w-full lg:px-52 lg:w-auto uppercase text-center text-white"
              onClick={handleSubmit}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
