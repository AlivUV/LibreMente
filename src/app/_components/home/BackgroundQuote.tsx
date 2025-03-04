import background from "@/../public/images/backgroundQuote/background.png";
import logo from "@/../public/images/logo/logo-naranja.png";
import bandera from "@/../public/images/backgroundQuote/bandera.png";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function BackgroundQuote() {
  return (
    <Box height="90vh" position={"relative"}>
      <Image
        src={background}
        alt="Fondo"
        style={{
          objectPosition: "50% 60%",
          objectFit: "fill",
          height: "100%",
          width: "100%",
        }}
      />
      <Image
        src={logo}
        alt="Logo"
        style={{
          position: "absolute",
          objectFit: "contain",
          height: "35%",
          width: "35%",
          zIndex: 1,
          top: "42.5%",
          right: "calc(50% + 30px)",
        }}
      />
      <Image
        src={bandera}
        alt="Bandera"
        style={{
          position: "absolute",
          objectFit: "contain",
          height: "calc(50%)",
          width: "50%",
          zIndex: 1,
          top: "35%",
          right: "calc(25%)",
        }}
      />
      <Typography
        position="absolute"
        zIndex={1}
        top="45%"
        variant="body2"
        left="calc(52.5%)"
        width="40%"
        color="secondary.contrastText"
        lineHeight={"1.5rem"}
        textAlign={"justify"}
      >
        LibreMente es una plataforma web de acompañamiento psicológico diseñada
        para apoyar a estudiantes en su trayectoria académica. Con un equipo de
        practicantes de Psicología supervisados por tutores experimentados y
        monitores docentes, brinda un espacio seguro para abordar las
        inquietudes emocionales de los jóvenes. Su misión es promover el
        bienestar integral, ofreciendo herramientas para superar desafíos tanto
        académicos como personales y contribuir con la creación de una comunidad
        más saludable y resiliente en su camino hacia el éxito.
      </Typography>
      {/* <Image
        src={logo}
        alt="Logo LibreMente"
        style={{
          zIndex: 1,
          position: "relative",
          bottom: "120%",
          left: "calc(10% + 20px)",
        }}
      /> */}
    </Box>
  );
}
