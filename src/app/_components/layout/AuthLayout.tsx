"use client";
import { Box, AppBar, Toolbar, Link, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import React, { FC, ReactNode, useState } from "react";
//import { NavbarSingle } from "../navbar";
//import { Footer } from "../ui";
import { ToastContainer } from "react-toastify";
import Image from "next/image";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "../navbar/Navbar";
import { UiContext } from "@/app/_contexts/ui/UiContext";
import { SideMenu } from "../ui/SideMenu/SideMenu";

interface Props {
  title: string;
  children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  const [isMenuOpen, toggleSideMenu] = useState(false);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <UiContext.Provider value = {{isMenuOpen: isMenuOpen, toggleSideMenu: () => {
        console.log("cambio estado")
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
