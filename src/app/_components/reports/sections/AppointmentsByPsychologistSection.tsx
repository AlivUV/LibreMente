import { useEffect, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { Autocomplete, TextField } from "@mui/material";
import fetchPsychologists from "@/app/_utils/server actions/psychologist";
import Chart from "../Chart";
import { countAppointmentsByPsychologist } from "@/app/_utils/server actions/report";
import PatientFilters from "@/app/_enums/reports/PatientFilters";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function AppointmentsByPsychologistSection() {
  console.log("Carga consultas");
  const allPsychologistsOption = { id: "", label: "Todos los practicantes" };
  const [optionsList, setOptionsList] = useState<
    { id: string; label: string }[]
  >([allPsychologistsOption]);
  const [selectedOption, setSelectedOption] = useState(optionsList[0]);
  useEffect(() => {
    fetchPsychologists(true).then((psychologists) => {
      setOptionsList([
        { id: allPsychologistsOption.id, label: allPsychologistsOption.label },
        ...psychologists.map((psychologist) => ({
          id: psychologist._id!,
          label: psychologist.fullName,
        })),
      ]);
    });
  }, [allPsychologistsOption.id, allPsychologistsOption.label, setOptionsList]);
  return (
    <SectionWrapper
      title="Consultas por Practicante"
      filter={
        <Autocomplete
          sx={{
            width: "20rem",
            input: {
              fontWeight: FontWeightValues.Medium,
            },
            "label, input": {
              color: "#666666",
            },
          }}
          size="small"
          renderInput={(params) => (
            <TextField {...params} label="Practicante" />
          )}
          autoHighlight
          options={optionsList}
          getOptionLabel={(option) => option.label}
          value={selectedOption}
          onChange={(e, newValue) => {
            if (newValue) setSelectedOption(newValue);
          }}
        />
      }
    >
      <Chart
        title="Edad"
        fetcher={() =>
          countAppointmentsByPsychologist(PatientFilters.Age, selectedOption.id)
        }
      />
      <Chart
        title="Género"
        fetcher={() =>
          countAppointmentsByPsychologist(
            PatientFilters.Gender,
            selectedOption.id
          )
        }
      />
      <Chart
        title="Carrera"
        fetcher={() =>
          countAppointmentsByPsychologist(
            PatientFilters.Career,
            selectedOption.id
          )
        }
      />
    </SectionWrapper>
  );
}
