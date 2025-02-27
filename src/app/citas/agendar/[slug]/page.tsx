import React from "react";
import PatientLayout from "@/app/_components/layout/PatientLayout";
import PsychologistDisplay from "@/app/_components/appointments/Display";
import { getPsychologistBySlug } from "@/app/_database/daos/psychologistDao";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendar cita",
};

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
    </PatientLayout>
  );
};

export default ScheduleAppointmentPage;
