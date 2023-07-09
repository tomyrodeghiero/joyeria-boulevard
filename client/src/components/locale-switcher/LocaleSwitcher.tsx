"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useState, useEffect } from "react";
import { SPANISH, ENGLISH } from "@/utils/constants";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [currentImage, setCurrentImage] = useState(
    locale === "es" ? SPANISH : ENGLISH
  );
  const [altText, setAltText] = useState(
    locale === "es" ? "Spanish" : "English"
  );

  const handleLocaleChange = (newLocale: string) => {
    router.replace(`/${newLocale}${pathname}`);
    setCurrentImage(newLocale === "es" ? SPANISH : ENGLISH);
    setAltText(newLocale === "es" ? "Spanish" : "English");
  };

  // También puedes usar un efecto para manejar los cambios en la propiedad 'locale'
  useEffect(() => {
    setCurrentImage(locale === "es" ? SPANISH : ENGLISH);
    setAltText(locale === "es" ? "Spanish" : "English");
  }, [locale]);

  return (
    <div className={clsx("relative text-gray-400")}>
      <img
        className="h-6 cursor-pointer"
        src={currentImage}
        alt={altText}
        onClick={() => handleLocaleChange(altText === "Spanish" ? "en" : "es")}
      />
    </div>
  );
}
