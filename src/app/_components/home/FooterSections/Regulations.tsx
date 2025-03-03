import { Link, Typography } from "@mui/material";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function Regulations() {
  return (
    <>
      <Typography
        color={"#E6B00B !important"}
        variant="h4"
        paddingBottom={"0.5rem"}
        fontWeight={FontWeightValues.Semibold}
      >
        Normatividad
      </Typography>
      <Link href="https://sgeneral.unad.edu.co/contratacion/invitaciones-publicas">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Contratación
        </Typography>
      </Link>
      <Link href="https://www.unad.edu.co/normatividad">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Normatividad y Políticas Institucionales
        </Typography>
      </Link>
      <Link href="https://www.unad.edu.co/politica-de-cookies">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Política de Cookies
        </Typography>
      </Link>
      <Link href="https://informacion.unad.edu.co/politica-de-privacidad/">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Política de Privacidad
        </Typography>
      </Link>
      <Link href="https://sgeneral.unad.edu.co/images/documentos/capsulas/2019/POLI_TRAT_DATO_PERS_UNAD.pdf">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Política de Tratamiento de Datos Personales
        </Typography>
      </Link>
      <Link href="https://informacion.unad.edu.co/politica-de-privacidad-y-condiciones-de-uso-de-la-app-campusoff">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Política de privacidad y condiciones de uso de la App Conecta
        </Typography>
      </Link>
      <Link href="https://www.unad.edu.co/politica-de-derechos-de-autor-y-autorizacion-de-uso-de-contenidos">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Política de Derechos de Autor y Autorización de Uso de contenidos
        </Typography>
      </Link>
      <Link href="https://informacion.unad.edu.co/transparencia-y-acceso-a-la-informacion">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Transparencia e Información Pública
        </Typography>
      </Link>
      <Link href="https://www.unad.edu.co/terminos-y-condiciones-del-sitio-web">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Términos y Condiciones del Sitio Web
        </Typography>
      </Link>
      <Link href="https://aurea.unad.edu.co/sai/">
        <Typography
          color={"#E6B00B !important"}
          borderBottom={"1px solid #0078b4"}
        >
          Sistema PQRSF
        </Typography>
      </Link>
    </>
  );
}
