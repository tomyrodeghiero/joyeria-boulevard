import {
  ARROW_RIGHT_ICON,
  FACEBOOK,
  HEARTH_ICON,
  INSTAGRAM,
  INSTAGRAM_URL,
  LINKEDIN,
  RED_HEARTH_ICON,
  TWITTER,
} from "@/utils/constants";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-700 border-t border-t-gray-400 pt-12 lg:px-4 md:px-0">
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
          <p className="link cursor-pointer uppercase lg:ml-4">
            Envíos y Devoluciones
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 lg:mt-8">
        <p className="text-center md:text-left mb-6 md:mb-0 order-2 md:order-1">
          <Link href="/my-account">
            <span className="text-black cursor-default">
              © 2015 - 2023 Joyería Boulevard.
            </span>
          </Link>
        </p>

        <div className="flex justify-center md:justify-start space-x-7 order-3 md:order-3">
          <Link href={INSTAGRAM_URL}>
            <img className="hover-lift h-5" src={FACEBOOK} alt="Icon 2" />
          </Link>
          <Link href={INSTAGRAM_URL}>
            <img className="hover-lift h-5" src={INSTAGRAM} alt="Icon 3" />
          </Link>
        </div>
      </div>

      <p className="flex items-center justify-center mt-5 gap-2 text-center">
        Desarrollado con
        <img
          className="h-4"
          src={RED_HEARTH_ICON}
          alt="Developed by Tomi Rodeghiero"
        />
        por
        <span className="text-gray-700 font-medium">Tomi Rodeghiero</span>
      </p>
    </footer>
  );
};

export default Footer;
