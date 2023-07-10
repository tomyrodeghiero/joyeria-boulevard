"use client";

import React from "react";
import { useRouter } from "next/navigation";

// create new context
const Context = React.createContext({});

export default function DashboardProvider({ children }: any) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return (
    <Context.Provider value={{ open, ref, toggle }}>
      {children}
    </Context.Provider>
  );
}

// custom hook to consume all context values { open, ref, toggle }
export function useToggle() {
  return React.useContext(Context);
}
