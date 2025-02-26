import { Box, Typography } from "@mui/material";
import { Metadata } from "next";

//Probando la nueva key de GitHub
export const metadata: Metadata = {
  title: "Usuario desactivado",
};

export default function Page() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      flexDirection="column"
    >
      <Typography variant="h4" color="secondary">
        Tu cuenta ha sido desactivada
      </Typography>
      <Typography>
        Por favor comunícate con el administrador si crees que ha ocurrido un
        error para que la active de nuevo
      </Typography>
    </Box>
  );
}
