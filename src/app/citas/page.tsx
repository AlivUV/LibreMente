import PatientLayout from "@/app/_components/layout/PatientLayout";
import { AppointmentList } from "@/app/_components/appointments/AppointmentList";
import { EmptyAppointment } from "@/app/_components/appointments/EmptyAppointment";
import Box from "@mui/material/Box/Box";
import {
  getUpcomingAppointmentsByPsychologist,
  getUpcomingAppointmentsByPatient,
} from "@/app/_database/daos/upcomingAppointmentDao";
import { getMyServerSession } from "@/app/_utils/next-auth";
import Roles from "../_enums/Roles";
import PageHeader from "../_components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Citas programadas",
};

const AppointmentPage = async ({
  searchParams,
}: {
  searchParams: { psychologist?: string };
}) => {
  const session = await getMyServerSession();
  const appointments = await(async () => {
    switch (session?.user.role!) {
      case Roles.Practicante:
        return getUpcomingAppointmentsByPsychologist(
          session?.psychologist?._id!
        );
      case Roles.Consultante:
        return getUpcomingAppointmentsByPatient(session?.user._id!);
      default:
        return searchParams.psychologist
          ? getUpcomingAppointmentsByPsychologist(searchParams.psychologist)
          : [];
    }
  })();
  return (
    <PatientLayout title="Mis citas" pageDescription="Mis citas">
      <Box>
        <PageHeader header="Mis Citas" />
        {appointments.length === 0 ? (
          <EmptyAppointment message={"No tienes citas activas"} />
        ) : (
          <AppointmentList appointments={appointments} history={false} />
        )}
      </Box>
    </PatientLayout>
  );
};

export default AppointmentPage;
