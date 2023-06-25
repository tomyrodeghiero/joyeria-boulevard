import {
  ARROW_RIGHT_ICON,
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  TWITTER,
} from "@/utils/constants";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-700 border-t border-t-gray-400 pt-12 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <a
          href="#"
          className="order-1 md:order-2 flex flex-col md:flex-row border-b border-b-black pb-2 justify-between items-center gap-4 md:gap-20 w-full md:w-auto"
        >
          <div className="flex gap-4 items-center">
            <h3>Últimas Novedades y Ofertas Exclusivas</h3>
            <img className="h-2" src={ARROW_RIGHT_ICON} alt="Arrow Right" />
          </div>
        </a>
        <div className="order-2 md:order-1 flex gap-1 flex-col lg:flex-row justify-between mt-6 md:mt-0 flex-wrap">
          <Link href="/contact" className="hover:underline uppercase">
            Contacto
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:underline uppercase lg:ml-4 md:ml-9"
          >
            Términos y Condiciones
          </Link>
          <a href="#" className="hover:underline uppercase lg:ml-4 md:ml-9">
            Envíos y Devoluciones
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-12">
        <p className="text-center md:text-left mb-6 md:mb-0">
          <span className="text-black">© 2015 - 2023 Joyería Boulevard.</span>{" "}
          Condiciones de uso <span className="font-medium">y</span> política de
          privacidad.
        </p>
        <div className="flex justify-center md:justify-start space-x-7">
          <img className="h-5" src={LINKEDIN} alt="Icon 1" />
          <img className="h-5" src={FACEBOOK} alt="Icon 2" />
          <img className="h-5" src={INSTAGRAM} alt="Icon 3" />
          <img className="h-5" src={TWITTER} alt="Icon 4" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
