"use client";
import React, { FC, ReactNode, useState } from "react";
import Head from "next/head";

import "react-toastify/dist/ReactToastify.css";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode;
}

export const PsychologistLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  // const [isMenuOpen, toggleSideMenu] = useState(false);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <UiContext.Provider value = {{isMenuOpen: isMenuOpen, toggleSideMenu: () => {toggleSideMenu(!isMenuOpen)}}}> */}

      {/* <NavbarPsychologist /> */}

      {/* <SideMenu /> */}
      {/* </UiContext.Provider> */}

      <main>
        {/* <ToastContainer /> */}
        {children}
      </main>
    </>
  );
};
