"use client";
import Head from "next/head";
import React, { FC, ReactNode, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

interface Props {
  title: string;
  children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  // const [isMenuOpen, toggleSideMenu] = useState(false);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <UiContext.Provider value = {{isMenuOpen: isMenuOpen, toggleSideMenu: () => {
        toggleSideMenu(!isMenuOpen)}}}> */}
      {/* <Navbar/> */}
      {/* <SideMenu /> */}
      {/* </UiContext.Provider> */}

      <main>
        {/* <ToastContainer /> */}

        {/* <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: { xs: "auto", sm: "calc(100vh - 100px)" },
            m: { xs: "5rem 0rem", sm: "1rem 0rem" },
          }}
        > */}
        {children}
        {/* </Box> */}
      </main>
      <footer>{/* <Footer position={false} /> */}</footer>
    </>
  );
};
