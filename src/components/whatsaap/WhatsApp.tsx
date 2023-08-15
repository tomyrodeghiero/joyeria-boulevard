"use client";

import { PHONE_NUMBER, WHATSAPP_ICON } from "@/utils/constants";
import React from "react";

const WhatsApp = () => {
  const message =
    "Hola, estoy interesado en una hermosa joya. ¿Podrían darme más información?";

  const handleClick = () => {
    window.open(
      `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-4 right-4 lg:right-12 z-50">
      <img
        className="hover-lift h-16 cursor-pointer"
        src={WHATSAPP_ICON}
        alt="WhatsApp"
        onClick={handleClick}
      />
    </div>
  );
};

export default WhatsApp;
