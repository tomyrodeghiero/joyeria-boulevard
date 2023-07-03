"use client";

import {
  ENGLISH,
  JOYERIA_BOULEVARD_LOGOTYPE,
  SEARCH_ICON,
  SHOPPING_CART,
  SPANISH,
} from "@/utils/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { removeEnLangPrefix } from "@/utils/functions";

const NavbarDesktop = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const locale = useLocale();
  console.log("locale", locale);

  const t = useTranslations("Navbar");

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/shop?search=${searchQuery}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const { cart } = useCart();
  console.log("cart", cart.length);
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <div>
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
            <Link href="/shop">{t("Shop")}</Link>
            <Link href="/about">{t("OurHistory")}</Link>
          </div>

          <div className="pl-14 border-l items-center border-l-gray-700 flex space-x-7">
            <img
              className="h-5 cursor-pointer"
              src={SEARCH_ICON}
              alt="Search"
              onClick={() => setSearchOpen(true)}
            />
            <Link href="/shopping-cart">
              <div className="relative">
                <img
                  className="h-5 cursor-pointer"
                  src={SHOPPING_CART}
                  alt="Shopping cart"
                />
                {cart.length > 0 && (
                  <div className="absolute top-[0.6rem] left-[0.7rem] text-[0.9rem] h-5 w-5 rounded-full border border-yellow-800 bg-gray-400 flex items-center justify-center text-white shadow">
                    {cart.length}
                  </div>
                )}
              </div>
            </Link>
            <Link
              href={`/${locale === "en" ? "es" : "en"}/${removeEnLangPrefix(
                pathname
              )}`}
            >
              <img
                className="h-6 cursor-pointer"
                src={locale === "en" ? ENGLISH : SPANISH}
                alt="Spanish"
              />
            </Link>
          </div>
        </div>
      </nav>
      {searchOpen && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out">
          <div className="bg-white w-full py-8 px-10 flex justify-between items-center">
            <Link href="/">
              <img
                className="h-10"
                src={JOYERIA_BOULEVARD_LOGOTYPE}
                alt="Joyeria Boulevard Logotype"
              />
            </Link>
            <h5
              className="text-lg hover:underline cursor-pointer"
              onClick={() => setSearchOpen(false)}
            >
              {t("Close")}
            </h5>
          </div>
          <div className="bg-white w-full top-0 py-8 px-10 flex gap-5 items-center">
            <input
              type="text"
              className="w-4/5 border border-black p-3"
              placeholder={t("SearchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="w-1/5 border border-black p-3 hover:bg-black hover:text-white"
            >
              {t("Search")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarDesktop;
