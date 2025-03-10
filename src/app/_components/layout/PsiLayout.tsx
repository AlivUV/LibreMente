"use client";
import Head from "next/head";
import { ReactNode, useState } from "react";

interface Props {
  title: string;
  pageDescription: string;
  children: ReactNode;
}

export default function PsiLayout({ children, title }: Props) {
  // const [isMenuOpen, toggleSideMenu] = useState(false);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <UiContext.Provider value = {{isMenuOpen: isMenuOpen, toggleSideMenu: () => {toggleSideMenu(!isMenuOpen)}}}> */}

      {/* <Navbar /> */}

      {/* <SideMenu /> */}
      {/* </UiContext.Provider> */}
      <main>
        {/* <ToastContainer /> */}
        {children}
      </main>
      <footer>{/* <Footer position={false} /> */}</footer>
    </>
  );
}
