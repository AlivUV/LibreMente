"use client";
import React, { FC } from "react";
// import {
//   Autocomplete,
//   Box,
//   Grid,
//   Paper,
//   Stack,
//   TextField,
//   ToggleButton,
//   ToggleButtonGroup,
// } from "@mui/material";
// import { usePsychologistList, useSpecialtiesList } from "../../hooks";
// import { Check, Tune } from "@mui/icons-material";

import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import Stack from "@mui/material/Stack/Stack";
import ToggleButton from "@mui/material/ToggleButton/ToggleButton";
import { Check, Tune } from "@mui/icons-material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";

interface Props {
  onQueryChange: any;
}

const genders = ["Hombres", "Mujeres", "No tengo preferencia"];

export const Search: FC<Props> = ({ onQueryChange }) => {
  // const { psychologistsList } = usePsychologistList("/psychologists");

  // const { specialtiesList } = useSpecialtiesList("/specialties");

  const [selected, setSelected] = React.useState(false);

  const [search, setSearch] = React.useState("nombre");

  // const handleChange = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newSearch: string,
  // ) => {
  //   if (newSearch !== null) {
  //     setSearch(newSearch);
  //   }
  // };

  // const onSearchTerm = (
  //   searchTerm: String | null
  // ) => {
  //   //router.push(`/psicologos/buscar/${searchTerm}`);
  //   if(!searchTerm) {
  //     onQueryChange("")
  //   } else {
  //     onQueryChange(searchTerm)
  //   }

  // };

  return (
    <Box className="fadeIn" sx={{ mb: 2, width: "100%" }}>
      <Paper sx={{ p: 2 }} variant="outlined">
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              {/* {search === "nombre" && <Autocomplete
                size="small"
                noOptionsText="Psicólogo no disponible"
                options={psychologistsList.map(
                  (psychologist) => psychologist.fullName
                )}
                sx={{ width: "100%" }}
                onChange={(event, newValue) => {
                  onSearchTerm(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar psicólogo por nombre"
                  />
                )}
              />}

              {search === "especialidad" && <Autocomplete
                size="small"
                noOptionsText="Especialidades no disponibles"
                options={specialtiesList.map((specialty) => specialty.name)}
                sx={{ width: "100%" }}
                onChange={(event, newValue) => {
                  onSearchTerm(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Selecciona la especialidad" />
                )}
              />}

              {search === "genero" && <Autocomplete
                size="small"
                noOptionsText="Genero no disponible"
                options={genders}
                sx={{ width: "100%" }}
                onChange={(event, newValue) => {
                  onSearchTerm(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Selecciona el género" />
                )}
              />} */}

              <ToggleButton
                value="check"
                selected={selected}
                size="small"
                color="secondary"
                onChange={() => {
                  setSelected(!selected);
                }}
              >
                {selected ? (
                  <Check color="secondary" />
                ) : (
                  <Tune color="secondary" />
                )}
              </ToggleButton>
            </Stack>
          </Grid>
          {selected && (
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <ToggleButtonGroup
                  color="secondary"
                  value={search}
                  exclusive
                  // onChange={handleChange}
                  size="small"
                  sx={{ textTransform: "none" }}
                  fullWidth
                >
                  <ToggleButton value="nombre" sx={{ textTransform: "none" }}>
                    Nombre
                  </ToggleButton>
                  <ToggleButton
                    value="especialidad"
                    sx={{ textTransform: "none" }}
                  >
                    Especialidad
                  </ToggleButton>
                  <ToggleButton value="genero" sx={{ textTransform: "none" }}>
                    Género
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};
