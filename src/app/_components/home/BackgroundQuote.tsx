import background from "@/../public/images/backgroundQuote.jpg";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function BackgroundQuote() {
  return (
    <Box height="70vh">
      <Image
        src={background}
        alt="Fondo"
        style={{ objectFit: "cover", height: "100%", width: "100%" }}
      />
      <Typography
        position="relative"
        zIndex={1}
        bottom="60%"
        variant="body2"
        left="calc(50% + 20px)"
        width="40%"
        color="secondary.contrastText"
      >
        Estumente es una plataforma web de acompañamiento psicológico diseñada
        para apoyar a estudiantes en su trayectoria académica. Con un equipo de
        practicantes de Psicología supervisados por tutores experimentados y
        coordinadores docentes, brinda un espacio seguro para abordar las
        inquietudes emocionales de los jóvenes. Su misión es promover el
        bienestar integral, ofreciendo herramientas para superar desafíos tanto
        académicos como personales y contribuir con la creación de una comunidad
        más saludable y resiliente en su camino hacia el éxito.
      </Typography>
      {/* <Image
        src={logo}
        alt="Logo EstuMente"
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
