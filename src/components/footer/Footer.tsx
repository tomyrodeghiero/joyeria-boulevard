import {
  ARROW_RIGHT_ICON,
  FACEBOOK,
  FACEBOOK_URL,
  INSTAGRAM,
  INSTAGRAM_URL,
  RED_HEARTH_ICON,
} from "@/utils/constants";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-700 lg:border-t lg:border-t-gray-400 pt-8 lg:pt-12 lg:px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <Link
          href="/shop"
          className="order-1 w-full md:order-2 flex justify-between md:flex-row border-b border-b-black pb-2 items-center gap-4 md:gap-20 md:w-auto"
        >
          <div className="flex gap-4 items-center justify-between">
            <h3>Últimas Novedades y Ofertas Exclusivas</h3>
            <img className="h-2" src={ARROW_RIGHT_ICON} alt="Arrow Right" />
          </div>
        </Link>
        <div className="order-2 md:order-1 flex gap-1 flex-col lg:flex-row justify-between flex-wrap">
          <Link href="/contact" className="link uppercase">
            Contacto
          </Link>
          <Link href="/terms-of-service" className="link uppercase lg:ml-4">
            Términos y Condiciones
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 lg:mt-8">
        <p className="text-center md:text-left mb-6 md:mb-0 order-2 md:order-1">
          <span className="text-black">© 1984 - 2024 Joyería Boulevard.</span>
        </p>

        <div className="flex justify-center md:justify-start space-x-7 order-3 md:order-3">
          <Link href={FACEBOOK_URL} target="_blank">
            <img className="hover-lift h-5" src={FACEBOOK} alt="Icon 2" />
          </Link>
          <Link href={INSTAGRAM_URL} target="_blank">
            <img className="hover-lift h-5" src={INSTAGRAM} alt="Icon 3" />
          </Link>
        </div>
      </div>

      <p className="flex items-center justify-center mt-5 gap-2 text-center text-gray-700">
        Desarrollado por
        <span className="font-medium text-lg">💻 Tomás Rodeghiero.</span>
      </p>
    </footer>
  );
};

export default Footer;
