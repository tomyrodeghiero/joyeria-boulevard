"use client";

import Main from "./main";
import Overlay from "./provider/overlay";
import TopNavigation from "./topnavigation";
import SideNavigation from "./sidenavigation";
import { useToggle } from "./provider/context";

/*	w-[calc(100%-16rem)] class get the remain width of the main component from lg:viewport by subtracting
(the total width by the width of the side navigation component which is w-64 = 16rem)*/

const style = {
  open: "lg:w-full",
  close: "lg:pl-4 lg:w-[calc(100%-16rem)]",
  mainContainer: `flex flex-col w-full pl-0 lg:space-y-4`,
  container: `bg-gray-200 relative lg:p-4`,
  main: `overflow-auto py-8 px-2 md:pb-8 md:pt-4 lg:pt-0`,
};

export default function DashboardLayout({ children }) {
  const { open } = useToggle();
  console.log("open", open);

  return (
    <div className={style.container}>
      <div className="flex items-start bg-gray-200 h-screen">
        <Overlay />
        <SideNavigation mobilePosition="right" />
        <div
          className={`${style.mainContainer} 
          ${open ? style.open : style.close}`}
        >
          <TopNavigation />
          <Main className={style.main}>{children}</Main>
        </div>
      </div>
    </div>
  );
}
