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
    <footer className="text-gray-700 border-t border-t-gray-400 pt-12">
      <div className="flex justify-between">
        <div className="flex justify-between">
          <div className="flex space-x-9">
            <Link href="/contact" className="hover:underline uppercase">
              Contacto
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:underline uppercase"
            >
              Términos y Condiciones
            </Link>
            <a href="#" className="hover:underline uppercase">
              Envíos y Devoluciones
            </a>
          </div>
        </div>
        <a
          href="#"
          className="flex border-b border-b-black pb-2 justify-between items-center gap-20"
        >
          <h3>Últimas Novedades y Ofertas Exclusivas</h3>
          <img className="h-2" src={ARROW_RIGHT_ICON} alt="Arrow Right" />
        </a>
      </div>

      <div className="flex justify-between items-center mt-12">
        <p>
          <span className="text-black">© 2015 - 2023 Joyería Boulevard.</span>{" "}
          Condiciones de uso <span className="font-medium">y</span> política de
          privacidad.
        </p>
        <div className="flex space-x-7">
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
