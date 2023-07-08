"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// import framer motion
import { motion } from "framer-motion";

import data from "./data";

const style = {
  title: `font-normal mx-4 text-sm`,
  link: `duration-200 flex font-thin items-center justify-start my-2 transition-colors text-gray-500 uppercase w-full`,
};

const variants = {
  // hidden: { opacity: 0, y: -50 },
  // show: { opacity: 1, y: 0 },
};

export default function SidenavItems() {
  const pathname = usePathname();

  return (
    <ul>
      {data.map((item, index) => (
        <motion.li
          key={item.title}
          variants={variants}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: index * 0.2 }} // Agrega un delay para que cada elemento se anime uno tras otro
        >
          <Link href={item.link} className={`${style.link}`}>
            <div className="flex items-center hover:bg-gray-200 p-4 w-full">
              <span>{item.icon}</span>
              <span className={style.title}>{item.title}</span>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
