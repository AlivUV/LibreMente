"use client";
//import Navbar from "@/components/navbar/Navbar";
import PsiLayout from "@/app/_components/layout/PsiLayout";
import Navbar from "./_components/navbar/Navbar";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { Hero } from "@/app/_components/ui/Hero";
// import { fetchServices, fetchUsers } from "../database/connection"
import { currentModels } from "@/app/_database/models/Service";
import { Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { homepagePath } from "@/app/_utils/redirect";
// import Button from "@mui/material";

/* async function Services() {
  const servicio = await fetchServices();
  return(
    <Typography color="secondary" align="center" variant="h1" gutterBottom>
          Probando conexión: el primer servicio es: {servicio}
    </Typography>
  )
}

async function Usuarios() {
  const usuarios = await fetchUsers();
  return(
    <Typography color="secondary" align="center" variant="h1" gutterBottom>
          Probando conexión: Los usuarios registrados son: {usuarios}
    </Typography>
  )
} */

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    function recurrente() {
      if (session) {
        router.push(homepagePath(session.user.role!));
      }
    }
    console.log("hola");
    recurrente();
  }, [session, router]);
  //const servicio = await fetchServices();
  //const usuarios = await fetchUsers();
  return (
    <PsiLayout title="estumente" pageDescription="">
      <Hero></Hero>
      <Box sx={{ margin: "40px auto", padding: "0px 30px" }}>
        {/* <Suspense fallback={<p>Cargando servicios</p>}>
          <Services/>
        </Suspense> */}

        {/* <Suspense fallback={<p>Cargando usuarios</p>}>
          <Usuarios/>
        </Suspense> */}
        <Typography color="inherit" align="center" variant="h2" gutterBottom>
          Trabajamos con terapeutas especializados en su labor.
        </Typography>

        {/* {isLoading ? (
          <FullScreenLoading />
        ) : (
          <PsychologistSingleList psychologists={psychologists} />
        )} */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <NextLink href="/psicologos/" passHref>
            <Link> */}
          <Button color="secondary" size="large" className="hero-btn">
            Comienza aquí
          </Button>
          {/* </Link>
          </NextLink> */}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "auto",
          height: 300,
          backgroundColor: "#efefef",
          padding: "0px 30px",
        }}
      >
        <Typography align="center" variant="h1" gutterBottom>
          ¿Eres estudiante de psicología apto para prácticas?
        </Typography>

        <Typography color="inherit" align="center" variant="h2" gutterBottom>
          Accede a nuestra plataforma a través del siguiente enlace.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <NextLink href="/psicologo/registro" passHref>
            <Link> */}
          <Button color="secondary" size="large" className="hero-btn">
            Únete aquí
          </Button>
          {/* </Link>
          </NextLink> */}
        </Box>
      </Box>
    </PsiLayout>
  );
}
