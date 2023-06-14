import {
  JOYERIA_BOULEVARD_LOGOTYPE,
  SEARCH_ICON,
  SHOPPING_CART,
  SPANISH,
} from "@/utils/constants";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center border-b pb-3 border-b-gray-400">
      <Link href="/" className="flex">
        <img
          className="h-10"
          src={JOYERIA_BOULEVARD_LOGOTYPE}
          alt="Joyeria Boulevard Logotype"
        />
      </Link>
      <div className="flex space-x-4 text-base">
        <div className="flex space-x-7">
          <a href="#">Tienda</a>
          <a href="#" className="pr-2">
            Nuestra Historia
          </a>
        </div>

        <div className="pl-14 border-l items-center border-l-gray-700 flex space-x-7">
          <img className="h-5 cursor-pointer" src={SEARCH_ICON} alt="Search" />
          <img
            className="h-5 cursor-pointer"
            src={SHOPPING_CART}
            alt="Shopping cart"
          />
          <img className="h-6 cursor-pointer" src={SPANISH} alt="Spanish" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
