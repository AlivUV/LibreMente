import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { TextField } from "@mui/material";
import Chart from "../Chart";
import { countYearlyActivePatients } from "@/app/_utils/server actions/report";
import PatientFilters from "@/app/_enums/reports/PatientFilters";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function YearlyPatientsSection() {
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <SectionWrapper
      title="Consultantes por año"
      filter={
        <TextField
          sx={{
            input: {
              fontWeight: FontWeightValues.Medium,
            },
            "label, input": {
              color: "#666666",
            },
          }}
          label="Año"
          value={year}
          type="number"
          onChange={(e) => setYear(Number(e.target.value))}
        />
      }
    >
      <Chart
        title="Edad"
        fetcher={() => countYearlyActivePatients(PatientFilters.Age, year)}
      />
      <Chart
        title="Género"
        fetcher={() => countYearlyActivePatients(PatientFilters.Gender, year)}
      />
      <Chart
        title="Carrera"
        fetcher={() => countYearlyActivePatients(PatientFilters.Career, year)}
      />
    </SectionWrapper>
  );
}
