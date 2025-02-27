"use client";
import React, { FC } from "react";

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
  const [selected, setSelected] = React.useState(false);

  const [search, setSearch] = React.useState("nombre");

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
