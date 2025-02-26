"use client";
import ModalStates from "@/app/_enums/PeriodModalStates";
import { IDay } from "@/app/_interfaces/schedule/IDay";
import { days, hours } from "@/app/_utils/constants";
import {
  Dialog,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import { useSession } from "next-auth/react";

export default function AddPeriodModal({
  schedule,
  setSchedule,
  state,
  close,
}: {
  schedule: IDay[];
  setSchedule: React.Dispatch<React.SetStateAction<IDay[]>>;
  state: ModalStates;
  close: () => void;
}) {
  const { data: session } = useSession();
  let dia: IDay["day"];
  let horaInicial: number;
  let horaFinal: number;
  // console.log("el estado de la modal es:" + state);

  function handleUpdate() {
    const i = days.indexOf(dia);
    for (let j = horaInicial; j <= horaFinal; j++) {
      // schedule.hours[i] = true;
      schedule[i].hours[j] = state === ModalStates.Add ? true : false;
    }
    // console.log("Ahora las horas son: " + schedule.hours);
    setSchedule([...schedule]);
    close();
  }
  return (
    <Dialog open={state !== ModalStates.Closed} onClose={close}>
      <Box padding={2}>
        <InputLabel id="dia">Día:</InputLabel>
        <Select
          labelId="dia"
          onChange={(e) => {
            dia = e.target.value as IDay["day"];
          }}
          fullWidth
          color="secondary"
        >
          {days.map((day) => (
            <MenuItem key={`opcion${day}`} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="horaInicial">Desde las:</InputLabel>
        <Select
          labelId="horaInicial"
          onChange={(e) => {
            horaInicial = e.target.value as number;
          }}
          color="secondary"
          fullWidth
        >
          {hours.map((hour) => (
            <MenuItem key={`opcion${hour}inicial`} value={hour.getValue()}>
              {hour.getString()}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="horaFinal">Hasta las:</InputLabel>
        <Select
          labelId="horaFinal"
          onChange={(e) => {
            horaFinal = e.target.value as number;
          }}
          fullWidth
          color="secondary"
        >
          {hours.map((hour) => (
            <MenuItem key={`opcion${hour}final`} value={hour.getValue()}>
              {hour.getString()}
            </MenuItem>
          ))}
        </Select>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          padding={2}
        >
          <Button
            size="large"
            color={state === ModalStates.Add ? "secondary" : "error"}
            onClick={handleUpdate}
          >
            {state !== ModalStates.Remove
              ? "Agregar período"
              : "Eliminar período"}
          </Button>
          <Button onClick={close}>Cancelar</Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
