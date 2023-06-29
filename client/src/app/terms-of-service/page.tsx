import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const TermsOfServices = () => {
  return (
    <main className="flex justify-between flex-col py-5 lg:py-14 px-5 lg:px-16">
      <Navbar />
      <div className="justify-center text-black text-[0.85rem] my-20 flex flex-col lg:py-20 lg:px-40">
        <h1 className="text-2xl text-center">Términos y Condiciones</h1>
        <p className="mt-5">
          Bienvenido a nuestra joyería. Al comprar en nuestra tienda, usted
          acepta los siguientes términos y condiciones: Los precios de nuestros
          productos se presentan tanto en pesos argentinos, aunque contamos con
          la posibilidad de recibir pagos en dólares. Las imágenes de los
          productos en nuestro sitio web representan los artículos reales que
          recibirá al realizar su compra. Recomendamos revisar detenidamente la
          descripción del producto antes de finalizar su compra para garantizar
          que cumple con sus expectativas.
        </p>
        <h2 className="mt-8 text-2xl">Seguridad</h2>
        <p className="mt-3">
          La seguridad de nuestros clientes es nuestra máxima prioridad. Su
          información nunca será compartida con terceros sin su explícito
          consentimiento. Si tiene alguna pregunta o inquietud sobre nuestra
          política de seguridad, no dude en ponerse en contacto con nosotros.
        </p>
      </div>
      <Footer />
    </main>
  );
};

export default TermsOfServices;
