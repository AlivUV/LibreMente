import { NextPage } from "next";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import { PsychologistLayout } from "@/app/_components/layout/PsychologistLayout";
import { getUserById } from "@/app/_database/daos/userDao";
import { getPreviousAppointmentsByPatientAndPsychologist } from "@/app/_database/daos/previousAppointmentDao";
import { SessionClinicHistoryList } from "@/app/_components/sessions/SessionClinicHistoryList";
import { getMyServerSession } from "@/app/_utils/next-auth";
import { redirect } from "next/navigation";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

interface Props {
  //   patient: IUser;
  //   appointments: IPreviousAppointment[];
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const fullName = await getUserById(params.id).then((user) => user.fullName);
  return {
    title: fullName,
  };
}

const PatientInfoPage: NextPage<Props> = async ({ params }) => {
  const patient = await getUserById(params.id);
  if (!patient) redirect("/consultantes");
  const session = await getMyServerSession();

  const appointments = await getPreviousAppointmentsByPatientAndPsychologist(
    params.id,
    session?.psychologist?._id!
  );
  return (
    <PsychologistLayout
      title="Información del paciente"
      pageDescription={"Información del paciente"}
    >
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Avatar
                alt="Psychologist"
                src={patient.profilePicture}
                sx={{ width: 120, height: 120, mb: 2 }}
                slotProps={{ img: { referrerPolicy: "no-referrer" } }}
              />

              <Typography variant="h4" align="center" color="text1.main">
                {`${patient.firstName} ${patient.lastName}`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box display="flex" flexDirection="column">
              <Typography
                variant="h5"
                fontWeight={FontWeightValues.Semibold}
                gutterBottom
                color="text1.main"
              >
                Sesiones
              </Typography>
              <SessionClinicHistoryList appointments={appointments} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PsychologistLayout>
  );
};

export default PatientInfoPage;
