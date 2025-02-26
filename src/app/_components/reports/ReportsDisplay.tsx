"use client";
import PsychologistFilters from "@/app/_enums/reports/PsychologistFilters";
import Roles from "@/app/_enums/Roles";
import { countUsersByRole } from "@/app/_utils/server actions/report";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import PageHeader from "../PageHeader";
import Chart from "./Chart";
import DownloadButton from "./DownloadButton";
import AppointmentsByPsychologistSection from "./sections/AppointmentsByPsychologistSection";
import SectionWrapper from "./sections/SectionWrapper";
import YearlyPatientsSection from "./sections/YearlyPatientsSection";

export default function ReportsDisplay() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  return (
    <>
      <div id="Reportes" ref={pdfRef}>
        <PageHeader header="Reportes" />
        <YearlyPatientsSection />
        <AppointmentsByPsychologistSection />
        <SectionWrapper title="Practicantes adscritos">
          <Chart
            title="Edad"
            fetcher={() =>
              countUsersByRole(PsychologistFilters.Age, Roles.Practicante)
            }
          />
          <Chart
            title="Género"
            fetcher={() =>
              countUsersByRole(PsychologistFilters.Gender, Roles.Practicante)
            }
          />
          <Chart
            title="Semestre"
            fetcher={() =>
              countUsersByRole(PsychologistFilters.Semester, Roles.Practicante)
            }
          />
        </SectionWrapper>
        {(session?.user.role === Roles.Administrador ||
          session?.user.role === Roles.Coordinador) && (
          <SectionWrapper title="Tutores adscritos">
            <Chart
              title="Edad"
              fetcher={() =>
                countUsersByRole(PsychologistFilters.Age, Roles.Tutor)
              }
            />
            <Chart
              title="Género"
              fetcher={() =>
                countUsersByRole(PsychologistFilters.Gender, Roles.Tutor)
              }
            />
          </SectionWrapper>
        )}
        {session?.user.role === Roles.Administrador && (
          <SectionWrapper title="Coordinadores adscritos">
            <Chart
              title="Edad"
              fetcher={() =>
                countUsersByRole(PsychologistFilters.Age, Roles.Coordinador)
              }
            />
            <Chart
              title="Género"
              fetcher={() =>
                countUsersByRole(PsychologistFilters.Gender, Roles.Coordinador)
              }
            />
          </SectionWrapper>
        )}
      </div>
      <DownloadButton pdfRef={pdfRef} />
    </>
  );
}
