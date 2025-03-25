import { getUpcomingAppointmentsByPsychologist } from "@/app/_database/daos/upcomingAppointmentDao";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import Avatar from "@mui/material/Avatar/Avatar";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import AppointmentDatePicker from "./AppointmentDatePicker";
import { getScheduleById } from "@/app/_database/daos/scheduleDao";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default async function PsychologistDisplay({
  psychologist,
}: {
  psychologist: IPsychologist;
}) {
  const appointments = await getUpcomingAppointmentsByPsychologist(
    psychologist._id!
  );
  const schedule = await getScheduleById(psychologist._id!);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            padding: "10px",
            flexGrow: 1,
            backgroundColor: "primary.main",
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
