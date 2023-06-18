"use client";

import { useState } from "react";
import {
  ARROW_RIGHT_ICON,
  ARROW_RIGHT_MOBILE_ICON,
  CLOSE_MENU_ICON,
  HISTORY_MOBILE_ICON,
  HOME_MOBILE_ICON,
  JOYERIA_BOULEVARD_LOGOTYPE,
  MENU_ICON,
  SHOPPING_CART,
  SHOPPING_MOBILE_ICON,
  SPANISH,
} from "@/utils/constants";
import Link from "next/link";
import React, { useEffect } from "react";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [isOpen]);

  return (
    <nav className="flex flex-wrap justify-between items-center pb-1 lg:hidden relative z-50">
      <Link href="/">
        <img
          className="h-10"
          src={JOYERIA_BOULEVARD_LOGOTYPE}
          alt="Joyeria Boulevard Logotype"
        />
      </Link>

      <div onClick={toggleMenu} className="cursor-pointer">
        {!isOpen && (
          <div className="flex gap-4 items-center">
            <img className="h-5" src={SHOPPING_CART} alt="Shopping" />
            <img className="h-4" src={MENU_ICON} alt="Menu" />
          </div>
        )}
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-white transition-transform transform ease-in-out duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } flex flex-col justify-between space-y-4 z-40 p-5 overflow-auto`}
      >
        <div>
          <div className="flex justify-between items-center">
            <Link href="/">
              <img
                className="h-8"
                src={JOYERIA_BOULEVARD_LOGOTYPE}
                alt="Joyeria Boulevard Logotype"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/shopping-cart">
                <img
                  className="h-5 cursor-pointer"
                  src={SHOPPING_CART}
                  alt="Shopping cart"
                />
              </Link>
              <div onClick={toggleMenu}>
                <img
                  className="h-5 cursor-pointer"
                  src={CLOSE_MENU_ICON}
                  alt="Close Menu"
                />
              </div>
            </div>
          </div>
          <div className="my-8">
            <div className="flex justify-between">
              <h1 className="text-xl mb-6">Navegación</h1>
              <img className="h-6 cursor-pointer" src={SPANISH} alt="Spanish" />
            </div>
            <div className="flex flex-col">
              <Link
                href="/"
                className="flex justify-between border-b border-gray-400 py-7 items-center"
              >
                <div className="flex gap-4">
                  <img
                    className="h-6 cursor-pointer"
                    src={HOME_MOBILE_ICON}
                    alt="Home"
                  />
                  <h2 className="text-xl">Inicio</h2>
                </div>
                <img
                  className="h-3 cursor-pointer"
                  src={ARROW_RIGHT_MOBILE_ICON}
                  alt="Arrow right"
                />
              </Link>
              <Link
                href="/"
                className="flex justify-between border-b border-gray-400 py-7 items-center"
              >
                <div className="flex gap-4">
                  <img
                    className="h-6 cursor-pointer"
                    src={SHOPPING_MOBILE_ICON}
                    alt="Shopping"
                  />
                  <h2 className="text-xl">Tienda</h2>
                </div>
                <img
                  className="h-3 cursor-pointer"
                  src={ARROW_RIGHT_MOBILE_ICON}
                  alt="Arrow right"
                />
              </Link>
              <Link
                href="/"
                className="flex justify-between border-b border-gray-400 py-7 items-center"
              >
                <div className="flex gap-4">
                  <img
                    className="h-6 cursor-pointer"
                    src={HISTORY_MOBILE_ICON}
                    alt="Our History"
                  />
                  <h2 className="text-xl">Our History</h2>
                </div>
                <img
                  className="h-3 cursor-pointer"
                  src={ARROW_RIGHT_MOBILE_ICON}
                  alt="Arrow right"
                />
              </Link>
            </div>
          </div>
        </div>

        <button className="bg-white border py-3 text-[0.85rem] font-medium px-10 border-black rounded mt-12 uppercase">
          Contact
        </button>
      </div>
    </nav>
  );
};

export default NavbarMobile;