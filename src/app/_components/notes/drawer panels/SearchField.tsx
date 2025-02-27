import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import NoteFilters from "@/app/_enums/NoteFilters";
import { Search } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  TextField,
  IconButton,
  TextFieldProps,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { esES } from "@mui/x-date-pickers/locales";
import { es } from "date-fns/locale";
import { useState } from "react";

export default function SearchField({
  setFilter,
  filterBy,
  setFilterBy,
  trigger,
  filterPatient,
}: {
  setFilter: (filter: string | Date) => void;
  filterBy: NoteFilters;
  setFilterBy: (filterBy: NoteFilters) => void;
  trigger: (value: boolean) => void;
  filterPatient?: boolean;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const searchFieldProps: TextFieldProps = {
    size: "small",
    variant: "standard",
    fullWidth: true,
  };
  switch (filterBy) {
    case NoteFilters.Title:
      searchFieldProps.label = "Título";
      break;
    case NoteFilters.Date:
      searchFieldProps.label = "Fecha";
      break;
    case NoteFilters.Patient:
      searchFieldProps.label = "Paciente";
  }
  function handleClick() {
    setFilter(filterBy !== NoteFilters.Date ? title : (date as Date));
    trigger(true);
  }
  return (
    <Stack direction="row" spacing={2} justifyContent="center" mb="10px">
      <FormControl size="small" variant="standard" sx={{ minWidth: 70 }}>
        <InputLabel
          id="search-by-label"
          sx={{ fontWeight: FontWeightValues.Light }}
        >
          Buscar por:
        </InputLabel>
        <Select
          labelId="search-by-label"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value as NoteFilters)}
          sx={{
            fontWeight: FontWeightValues.Semibold,
            ".MuiInput-input": { color: "#666666" },
          }}
        >
          <MenuItem value={NoteFilters.Title}>Título</MenuItem>
          <MenuItem value={NoteFilters.Date}>Fecha</MenuItem>
          {!filterPatient && (
            <MenuItem value={NoteFilters.Patient}>Paciente</MenuItem>
          )}
        </Select>
      </FormControl>
      {filterBy !== NoteFilters.Date ? (
        <TextField
          {...searchFieldProps}
          sx={{ maxWidth: 180 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={es}
          localeText={
            esES.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <FormControl size="small" variant="standard" sx={{ maxWidth: 180 }}>
            <DatePicker
              views={["year", "month", "day"]}
              slotProps={{ textField: searchFieldProps }}
              maxDate={new Date()}
              value={date}
              onChange={(value) => setDate(value)}
            />
          </FormControl>
        </LocalizationProvider>
      )}
      <IconButton color="secondary" onClick={handleClick}>
        <Search />
      </IconButton>
    </Stack>
  );
}
