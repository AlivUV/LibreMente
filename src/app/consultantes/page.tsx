import type { Metadata, NextPage } from "next";
import { Box } from "@mui/material";
import { PsychologistLayout } from "../_components/layout/PsychologistLayout";
import { getPatientsByPsychologist } from "../_database/daos/userDao";
import { EmptyPatient } from "../_components/ui/EmptyPatient";
import { PatientList } from "../_components/patients/PatientList";
import { getMyServerSession } from "../_utils/next-auth";
import PageHeader from "../_components/PageHeader";

export const metadata: Metadata = {
  title: "Pacientes",
};

const PatientPage: NextPage = async () => {
  const session = await getMyServerSession();
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

export default PatientPage;
