import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { PsychologistLayout } from "@/app/_components/layout/PsychologistLayout";
import { getPreviousAppointmentById } from "@/app/_database/daos/previousAppointmentDao";
import { CardPatientAppointment } from "@/app/_components/appointments/CardPatientAppointment";
import { getUserById } from "@/app/_database/daos/userDao";
import { SessionSummary } from "@/app/_components/appointments/SessionSummary";
import { getNotesByAppointment } from "@/app/_database/daos/noteDao";
import NotesCard from "@/app/_components/appointments/NotesCard";
import { getMyServerSession } from "@/app/_utils/next-auth";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import { redirect } from "next/navigation";
import { Metadata } from "next";

// import { PsychologistLayout } from "../../../components/layout";

// import { IAppointment } from "../../../interfaces";
// import { dbAppointment } from "../../../database";
// import {
//   CardPatientAppointment,
//   SessionSummary,
// } from "../../../components/session";

// import { toast } from "react-toastify";
// import { psiApi } from "../../../axios-api";

export type OrderResponseBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

export const metadata: Metadata = {
  title: "Resumen de Cita",
};

export default async function AppointmentPage({
  params,
}: {
  params: { id: string };
}) {
  const appointment = await getPreviousAppointmentById(params.id);
  if (!appointment) redirect("/citas/historial");
  const session = await getMyServerSession();
  const patient = await getUserById(appointment.patient);
  const notes =
    session?.psychologist?._id === appointment.psychologist
      ? await getNotesByAppointment(appointment._id!)
      : undefined;
  return (
    <PsychologistLayout
      title="Resumen de la sesión"
      pageDescription={"Resumen de la sesión"}
    >
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Grid container className="fadeIn" spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardPatientAppointment patient={patient!} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="summary-card">
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="h6"
                    fontWeight={FontWeightValues.Semibold}
                    color="text2.main"
                  >
                    Resumen
                  </Typography>
                  <Box flex={1} />
                  <Chip
                    label={`Cita ${appointment.state}`}
                    variant="outlined"
                    color="success"
                  />
                </Box>

                <Divider sx={{ my: 1 }} />
                <SessionSummary
                  appointmentValues={{
                    typeService: "cualquier servicio",
                    date: appointment.date,
                    cost: 0,
                    duration: 10,
                  }}
                />
                <Divider sx={{ my: 3 }} />
                {/* {notes.length > 0  (
                  <NotesCard notes={notes} />
                ) : (
                  <Typography variant="h2">
                    No se tomaron notas durante esta sesión
                  </Typography>
                )} */}
                {notes && notes.length > 0 && <NotesCard notes={notes} />}
                {notes && notes.length === 0 && (
                  <Typography variant="h6" color="text2.main">
                    No se tomaron notas durante esta sesión
                  </Typography>
                )}
                {/* <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                  {appointment.isPaid && (
                    <NextLink
                      href={`/app/citas/meet/${appointment._id}`}
                      passHref
                      prefetch={false}
                    >
                      <Button
                        size="small"
                        color="secondary"
                        fullWidth
                        disabled={
                          appointment.startTime >= Date.now() / 1000 ||
                          appointment.endTime <= Date.now() / 1000
                        }
                      >
                        {appointment.endTime <= Date.now() / 1000
                          ? "Sesión finalizada"
                          : "Ingresar a la sesión"}
                      </Button>
                    </NextLink>
                  )}
                </Box> */}
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid xs={12} sm={6}>
            <NotesCard notes={notes} />
          </Grid> */}
        </Grid>
      </Box>
    </PsychologistLayout>
  );
}
