import { Link, Typography } from "@mui/material";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function LinksOfInterest() {
  return (
    <>
      <Typography
        color={"#E6B00B !important"}
        variant="h4"
        paddingBottom={"0.5rem"}
        fontWeight={FontWeightValues.Semibold}
      >
        Enlaces de interés
      </Typography>
      <Link href="https://informacion.unad.edu.co/acerca-de-la-unad/">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Acerca de la UNAD
        </Typography>
      </Link>
      <Link href="https://estudios.unad.edu.co/financiacion">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Financiación de Programas
        </Typography>
      </Link>
      <Link href="https://vinter.unad.edu.co/">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Internacionalización
        </Typography>
      </Link>
      <Link href="https://sai.unad.edu.co/simulador-de-matricula">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Simulador de Matrícula
        </Typography>
      </Link>
      <Link href="https://sai.unad.edu.co/">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Sistema de Atención Integral
        </Typography>
      </Link>
      <Link href="https://unad.hoytrabajas.com/">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Portal Laboral
        </Typography>
      </Link>
      <Link href="https://investigacion.unad.edu.co/">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Investigación
        </Typography>
      </Link>
      <Link href="https://eventos.unad.edu.co/">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Portal de Eventos
        </Typography>
      </Link>
      <Link href="https://selloeditorial.unad.edu.co/">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Sello Editorial
        </Typography>
      </Link>
      <Link href="https://academia.unad.edu.co/pregrado-posgrado/atencion/consejeria-academica">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Consejería Académica
        </Typography>
      </Link>
      <Link href="https://academia.unad.edu.co/pregrado-posgrado/proximos-a-graduarse/grados">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Grados
        </Typography>
      </Link>
    </>
  );
}
