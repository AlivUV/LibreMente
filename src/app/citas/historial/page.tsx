import type { Metadata, NextPage } from "next";
// import { getSession } from "next-auth/react";
// import { GetServerSideProps } from "next";
// import { PatientLayout } from "../../../components/layout/PatientLayout";
// import { dbAppointment } from "../../../database";
// import { IAppointment } from "../../../interfaces";
// import { AppointmentHistoryList } from "../../../components/appointment";
// import { EmptyAppointment } from "../../../components/ui";

import PatientLayout from "@/app/_components/layout/PatientLayout";
import { EmptyAppointment } from "@/app/_components/appointments/EmptyAppointment";
import { getMyServerSession } from "@/app/_utils/next-auth";
import {
  getPreviousAppointmentsByPatient,
  getPreviousAppointmentsByPsychologist,
} from "@/app/_database/daos/previousAppointmentDao";
import { AppointmentList } from "@/app/_components/appointments/AppointmentList";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
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
  // const appointments =
  //   session?.user.role === Roles.Practicante
  //     ? await getPreviousAppointmentsByPsychologist(session?.psychologist?._id!)
  //     : await getPreviousAppointmentsByPatient(session?.user._id!);
  const appointments = await (async () => {
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
  console.log(`El tipo de las fechas es:${typeof appointments[0]}`);
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session: any = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/autenticacion/login?p=/app/citas/historial",
//         permanent: false,
//       },
//     };
//   }

//   if (session) {
//     if (session.user.role !== "patient") {
//       return {
//         redirect: {
//           destination: `/psicologo/home`,
//           permanent: false,
//         },
//       };
//     }
//   }

//   const appointments = await dbAppointment.getAppointmentsHistoryByPatient(
//     session.user._id
//   );

//   return {
//     props: {
//       appointments,
//     },
//   };
// };

export default HistoryAppointmentPage;
