import { Link, Typography } from "@mui/material";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function ContactInformation() {
  return (
    <>
      <Typography
        color={"#E6B00B !important"}
        variant="h4"
        paddingBottom={"0.5rem"}
        fontWeight={FontWeightValues.Semibold}
      >
        Datos de Contacto
      </Typography>
      <Typography>
        <b>Telefono:</b>{" "}
        <Link href="tel:3182194645" color={"#E6B00B !important"}>
          3182194645
        </Link>
      </Typography>
      <Typography>
        <b>Sede Principal:</b> Calle 14 Sur # 14 – 23 Barrio Restrepo, Bogotá -
        Colombia.
      </Typography>
      <hr style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} />
      <Link href="enlace">
        <Typography color={"#E6B00B !important"}>
          Atención al usuario
        </Typography>
      </Link>
      <Link href="enlace">
        <Typography color={"#E6B00B !important"}>
          {" "}
          Buzón de notificaciones judiciales
        </Typography>
      </Link>
      <hr style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} />
      <Link href="enlace">
        <Typography color={"#E6B00B !important"}>
          Ir al Plan anticorrupción
        </Typography>
      </Link>
      <Typography>
        <b>Línea anticorrupción:</b>
        <Link href="tel:3182194645" color={"#E6B00B !important"}>
          3182194645
        </Link>
      </Typography>
      <Link href="anticorrupcion@unad.edu.co">
        <Typography color={"#E6B00B !important"}>
          anticorrupcion@unad.edu.co
        </Typography>
      </Link>
    </>
  );
}
