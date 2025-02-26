import React from "react";
// import { getSession } from "next-auth/react";
// import { NextPage, GetServerSideProps } from "next";
import PatientLayout from "@/app/_components/layout/PatientLayout";
import PsychologistDisplay from "@/app/_components/appointments/Display";
import { getPsychologistBySlug } from "@/app/_database/daos/psychologistDao";
import Box from "@mui/material/Box/Box";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendar cita",
};

interface Props {
  //   psychologist: IPsychologist;
  //   services: IService[];
  params: { slug: string };
}

const ScheduleAppointmentPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const psychologist = await getPsychologistBySlug(params.slug);
  if (!psychologist) redirect("/practicantes");

  return (
    <PatientLayout title="Agendar cita" pageDescription="Agendar cita">
      {psychologist && <PsychologistDisplay psychologist={psychologist} />}
      {/* <ModalBox /> */}
    </PatientLayout>
  );
};

export default ScheduleAppointmentPage;
