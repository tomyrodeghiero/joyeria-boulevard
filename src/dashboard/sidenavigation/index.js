"use client";

import SidenavItems from "./items";
import SidenavHeader from "./header";
import css from "./style.module.css";
import { useToggle } from "../provider/context";

const style = {
  mobilePosition: {
    left: "left-0",
    right: "right-0",
  },
  container: `pb-32 lg:pb-6`,
  close: `hidden lg:block lg:w-64 lg:z-auto`,
  default: `bg-white h-screen overflow-y-auto top-0 lg:relative`,
};

export default function SideNavigation({ mobilePosition }) {
  const { open, ref } = useToggle();
  return (
    <aside
      ref={ref}
      className={`${style.default} ${style.mobilePosition[mobilePosition]} 
       ${open ? "w-64 absolute z-40 lg:hidden" : style.close} ${css.scrollbar}`}
    >
      <div className={style.container}>
        <SidenavHeader />
        <SidenavItems />
      </div>
    </aside>
  );
}
