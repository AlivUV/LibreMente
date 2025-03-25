import type { Metadata, NextPage } from "next";

import PatientLayout from "@/app/_components/layout/PatientLayout";
import { EmptyAppointment } from "@/app/_components/appointments/EmptyAppointment";
import { getMyServerSession } from "@/app/_utils/next-auth";
import {
  getPreviousAppointmentsByPatient,
  getPreviousAppointmentsByPsychologist,
} from "@/app/_database/daos/previousAppointmentDao";
import { AppointmentList } from "@/app/_components/appointments/AppointmentList";
import Box from "@mui/material/Box/Box";
import Roles from "@/app/_enums/Roles";
import PageHeader from "@/app/_components/PageHeader";

export const metadata: Metadata = {
  title: "Historial de Citas",
};

interface Props {
  searchParams: { psychologist?: string };
}

const HistoryAppointmentPage: NextPage<Props> = async ({ searchParams }) => {
  const session = await getMyServerSession();
  const appointments = await(async () => {
    switch (session?.user.role!) {
      case Roles.Practicante:
        return getPreviousAppointmentsByPsychologist(
          session?.psychologist?._id!
        );
      case Roles.Consultante:
        return getPreviousAppointmentsByPatient(session?.user._id!);
      default:
        return searchParams.psychologist
          ? getPreviousAppointmentsByPsychologist(searchParams.psychologist)
          : [];
    }
  })();
  return (
    <PatientLayout
      title="Historial de citas"
      pageDescription="Historial de citas"
    >
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <PageHeader header="Historial de citas" />
        {/*Mejorar la validacion porque si hay citas pero no son del tipo para el historial*/}
        {appointments.length === 0 ? (
          <EmptyAppointment message={"Aún no tienes citas en tu historial"} />
        ) : (
          <AppointmentList appointments={appointments} history={true} />
        )}
      </Box>
    </PatientLayout>
  );
};

export default HistoryAppointmentPage;
