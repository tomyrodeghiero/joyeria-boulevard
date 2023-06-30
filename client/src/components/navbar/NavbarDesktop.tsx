"use client";
import {
  JOYERIA_BOULEVARD_LOGOTYPE,
  SEARCH_ICON,
  SHOPPING_CART,
  SPANISH,
} from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavbarDesktop = () => {
  const pathname = usePathname();

  return (
    <nav className="justify-between items-center border-b pb-3 border-b-gray-400 hidden lg:flex">
      <Link href="/">
        <img
          className="h-8"
          src={JOYERIA_BOULEVARD_LOGOTYPE}
          alt="Joyeria Boulevard Logotype"
        />
      </Link>
      <div className="flex space-x-4 text-base">
        <div className="flex space-x-7 text-[1.05rem]">
          <Link href="/shop">Tienda</Link>
          <Link href="/about">Nuestra Historia</Link>
        </div>

        <div className="pl-14 border-l items-center border-l-gray-700 flex space-x-7">
          <img className="h-5 cursor-pointer" src={SEARCH_ICON} alt="Search" />
          <Link href="/shopping-cart">
            <div>
              <img
                className="h-5 cursor-pointer"
                src={SHOPPING_CART}
                alt="Shopping cart"
              />
            </div>
          </Link>
          <img className="h-6 cursor-pointer" src={SPANISH} alt="Spanish" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarDesktop;
