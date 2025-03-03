import { Button, Link, Stack, Typography } from "@mui/material";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import XIcon from "@mui/icons-material/X";
import { Facebook, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { TikTokIcon } from "@/app/_icons";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FurtherInformation: FC<Props> = ({ setOpen }) => {
  return (
    <>
      <Link href="https://tiendavirtualunadista.com/">
        <Typography paddingTop={"3rem"} color={"#E6B00B !important"}>
          Tienda Virtual Unadista
        </Typography>
      </Link>
      <Link href="https://informacion.unad.edu.co/mapa-del-sitio">
        <Typography color={"#E6B00B !important"}>
          Ir al Mapa del sitio
        </Typography>
      </Link>
      <Link href="https://www.unad.edu.co/directorio-de-unidades">
        <Typography color={"#E6B00B !important"}>
          Listado de Unidades
        </Typography>
      </Link>
      <Link href="https://directorio.unad.edu.co/directorio-global-unad">
        <Typography color={"#E6B00B !important"}>
          Directorio de Funcionarios
        </Typography>
      </Link>
      <Link href="https://directorio.unad.edu.co/">
        <Typography color={"#E6B00B !important"}>
          Canales físicos y electrónicos para atención al público
        </Typography>
      </Link>
      <hr style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} />
      <Typography variant="h5" fontWeight={FontWeightValues.Semibold}>
        Síguenos en:
      </Typography>
      <Stack
        direction="row"
        sx={{
          "*": {
            fontSize: "3rem",
          },
        }}
      >
        <Link href="https://www.facebook.com/UniversidadUNAD">
          <Facebook style={{ fill: "#E6B00B" }} />
        </Link>
        <Link href="https://x.com/UniversidadUNAD">
          <XIcon style={{ fill: "#E6B00B" }} />
        </Link>
        <Link href="https://www.youtube.com/universidadunad">
          <YouTube style={{ fill: "#E6B00B" }} />
        </Link>
        <Link href="https://www.instagram.com/universidadunad/">
          <Instagram style={{ fill: "#E6B00B" }} />
        </Link>
        <Link href="https://www.linkedin.com/school/universidadunad/">
          <LinkedIn style={{ fill: "#E6B00B" }} />
        </Link>
        <Link href="https://www.tiktok.com/@universidadunad">
          <TikTokIcon color={"#E6B00B"} />
        </Link>
      </Stack>
      <br />
      <Button
        variant="outlined"
        color="contrast"
        size="large"
        onClick={() => setOpen(true)}
      >
        Créditos
      </Button>
    </>
  );
};

export default FurtherInformation;
