import type { Metadata, NextPage } from "next";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Typography, Box } from "@mui/material";
import { PsychologistLayout } from "../_components/layout/PsychologistLayout";
import { getPatientsByPsychologist } from "../_database/daos/userDao";
import { getServerSession } from "next-auth";
import { EmptyPatient } from "../_components/ui/EmptyPatient";
import { PatientList } from "../_components/patients/PatientList";
import { getMyServerSession } from "../_utils/next-auth";
import PageHeader from "../_components/PageHeader";
// import { PsychologistLayout } from "../../../components/layout";
// import { EmptyPatient, FullScreenLoading } from "../../../components/ui";
// import { PatientList } from "../../../components/patients";
// import { usePatient } from "../../../hooks";

export const metadata: Metadata = {
  title: "Pacientes",
};

const PatientPage: NextPage = async () => {
  //   const { patients, isLoading } = usePatient("/appointments/patients");
  const session = await getMyServerSession();
  console.log(`El usuario es: ${session?.user}`);
  console.log(`El psicólogo es: ${session?.psychologist}`);
  const patients = await getPatientsByPsychologist(session?.psychologist?._id!);
  return (
    <PsychologistLayout title="Mis pacientes" pageDescription="Pacientes">
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <PageHeader header="Mis Pacientes" />
        {patients.length === 0 ? (
          <EmptyPatient message={"No tienes pacientes activos"} />
        ) : (
          <PatientList patients={patients} />
        )}
      </Box>
    </PsychologistLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session: any = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/autenticacion/login?p=/psicologo/pacientes",
//         permanent: false,
//       },
//     };
//   }

//   if (session) {
//     if (session.user.role !== "psychologist") {
//       return {
//         redirect: {
//           destination: `/app/home`,
//           permanent: false,
//         },
//       };
//     }
//   }

//   return {
//     props: {},
//   };
// };

export default PatientPage;
