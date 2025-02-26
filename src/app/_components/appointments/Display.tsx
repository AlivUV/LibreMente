import { getUpcomingAppointmentsByPsychologist } from "@/app/_database/daos/upcomingAppointmentDao";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import Avatar from "@mui/material/Avatar/Avatar";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import Rating from "@mui/material/Rating/Rating";
import Stack from "@mui/material/Stack/Stack";
import TextField from "@mui/material/TextField/TextField";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";
import Typography from "@mui/material/Typography/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import AppointmentDatePicker from "./AppointmentDatePicker";
import { getScheduleById } from "@/app/_database/daos/scheduleDao";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { es } from "date-fns/locale";

export default async function PsychologistDisplay({
  psychologist,
}: {
  psychologist: IPsychologist;
}) {
  const service = "Servicio";
  const date = new Date(2014, 4, 18);
  const appointments = await getUpcomingAppointmentsByPsychologist(
    psychologist._id!
  );
  const schedule = await getScheduleById(psychologist._id!);
  console.log("psychologist es:");
  console.log(psychologist);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            padding: "10px",
            flexGrow: 1,
            backgroundColor: "secondary.main",
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            align="center"
            color="white"
            fontWeight={FontWeightValues.Semibold}
          >
            Pedir cita con
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Avatar
              alt="Psychologist"
              src={psychologist.profilePicture}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
          </Box>
          <Typography
            variant="h4"
            align="center"
            color="white"
            fontWeight={FontWeightValues.Semibold}
          >
            {psychologist.fullName}
          </Typography>
          {/* <Stack spacing={1} alignItems="center" sx={{ m: 1 }}>
            <Rating
              name="half-rating-read"
              defaultValue={psychologist.calification}
              precision={0.5}
              readOnly
            />
          </Stack> */}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ alignItems: "stretch", justifyContent: "center" }}
          mb={2}
        >
          <AppointmentDatePicker
            appointments={appointments}
            schedule={schedule}
            psychologist={psychologist}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
