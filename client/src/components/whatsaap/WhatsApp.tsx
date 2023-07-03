"use client";

import React from "react";
import { PHONE_NUMBER, WHATSAPP_ICON } from "@/utils/constants";

const WhatsApp = () => {
  const message =
    "Hola, estoy interesado en una joya que vi en su página web. ¿Podrían darme más información?";

  const handleClick = () => {
    window.open(
      `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="lg:py-8 py-8 flex justify-end items-center">
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
