import "@/app/_styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import Providers from "@/app/_providers/Providers";
import Navbar from "@/app/_components/navbar/Navbar";
import styles from "@/app/_styles/layout.module.css";
import Box from "@mui/material/Box/Box";
import { getMyServerSession } from "./_utils/next-auth";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | EstuMente",
    default: "EstuMente",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getMyServerSession();
  // if (session) {
  //   const sessionStart = new Date();
  //   console.log("La sesión inicia:", sessionStart);
  // }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CssBaseline />
        <Providers>
          <Box className={styles["layout"]}>
            <Navbar />
            <ToastContainer position="bottom-center" />
            <Box className={styles["content"]}>{children}</Box>
          </Box>
        </Providers>
        {/* {children} */}
      </body>
    </html>
  );
}
