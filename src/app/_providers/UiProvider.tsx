"use client";
import { UiContext } from "@/app/_contexts/ui/UiContext";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function UiProvider({ children }: Props) {
  const [isMenuOpen, toggleSideMenu] = useState(false);
  return (
    <UiContext.Provider
      value={{
        isMenuOpen: isMenuOpen,
        toggleSideMenu: () => {
          toggleSideMenu(!isMenuOpen);
        },
      }}
    >
      {children}
    </UiContext.Provider>
  );
}
