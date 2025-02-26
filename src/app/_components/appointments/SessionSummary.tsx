import { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
// import { convertTime } from "../../utils/time";
// import { formatCurrency } from "../../utils/currency";

interface Props {
  appointmentValues?: {
    typeService: string;
    date: Date;
    cost: number;
    duration: number;
  };
}

export const SessionSummary: FC<Props> = ({ appointmentValues }) => {
  const summaryValues = appointmentValues
    ? appointmentValues
    : {
        typeService: "",
        date: new Date(),
        cost: 0,
        duration: "",
      };

  return (
    <Grid container>
      {/* <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography>Tipo de servicio</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }} display="flex" justifyContent="end">
        <Typography>{summaryValues.typeService} </Typography>
      </Grid> */}

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography color="text2.main">Fecha</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }} display="flex" justifyContent="end">
        <Typography color="text2.main">
          {format(summaryValues.date, "PPPP", { locale: es })}
        </Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography color="text2.main">Hora</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }} display="flex" justifyContent="end">
        <Typography color="text2.main">
          {format(summaryValues.date, "hh:mm aa", { locale: es })}
        </Typography>
      </Grid>

      {/* <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography>Duración</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }} display="flex" justifyContent="end">
        <Typography>{`${summaryValues.duration} min`}</Typography>
      </Grid> */}
    </Grid>
  );
};
