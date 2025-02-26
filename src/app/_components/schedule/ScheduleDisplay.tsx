"use client";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import ModalStates from "@/app/_enums/PeriodModalStates";
import { IDay } from "@/app/_interfaces/schedule/IDay";
import { ISchedule } from "@/app/_interfaces/schedule/ISchedule";
import { scheduleTheme } from "@/app/_themes/schedule-theme";
import { days } from "@/app/_utils/constants";
import { SCHEDULES } from "@/app/_utils/endpoints";
import { ThemeProvider } from "@emotion/react";
import { AddBox, DisabledByDefault, Circle } from "@mui/icons-material";
import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import PageHeader from "../PageHeader";
import AddPeriodModal from "./AddPeriodModal";
import ScheduleTable from "./ScheduleTable";

export default function ScheduleDisplay() {
  function updateSchedule() {
    toast.promise(
      fetch(process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES, {
        method: "POST",
        body: JSON.stringify({
          psychologist: session?.psychologist?._id,
          schedule: schedule,
        }),
      }),
      {
        pending: "Guardando agenda...",
        success: "Agenda guardada con éxito",
        error: "Ha ocurrido un error, por favor inténtalo nuevamente",
      }
    );
  }

  console.log("Carga la página");
  let result: ISchedule | null | undefined;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const fetchSchedule = useCallback(() => {
    console.log(
      "voy a mandar: " + process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES
    );
    if (session) {
      setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES}?psychologist=${
          session?.psychologist?._id
        }`
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log("Este es el resultado");
          // console.log(res.days);
          res;
          console.log("Me llegó algo");
          if (res?.days) setSchedule([...res.days]);
          setLoading(false);
        });
    }
  }, [session]);
  useEffect(() => {
    fetchSchedule();
  }, [session, fetchSchedule]);
  // console.log("Result days es: " + result?.days);
  const [schedule, setSchedule] = React.useState<IDay[]>(
    // result?.days ? [...result.days] :
    days.map((day) => ({
      day: day,
      hours: new Array(24).fill(false),
    }))
  );
  const [modalOpen, setModalOpen] = useState(ModalStates.Closed);
  // console.log("el lunes es: " + JSON.stringify(schedule));
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <AddPeriodModal
        schedule={schedule}
        setSchedule={setSchedule}
        state={modalOpen}
        close={() => setModalOpen(ModalStates.Closed)}
      />
      <PageHeader header="Configurar agenda" />
      <Stack direction="row" overflow="hidden" marginBottom="30px">
        <List
          sx={{
            span: {
              color: "#666666",
              fontWeight: `${FontWeightValues.Semibold} !important`,
            },
            overflowY: "auto",
          }}
        >
          <ListItem key="addPeriod">
            <ListItemButton onClick={() => setModalOpen(ModalStates.Add)}>
              <ListItemIcon>
                <AddBox color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Agregar periodo" />
            </ListItemButton>
          </ListItem>
          <ListItem key="removePeriod">
            <ListItemButton onClick={() => setModalOpen(ModalStates.Remove)}>
              <ListItemIcon>
                <DisabledByDefault color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Eliminar periodo" />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem>
            <ThemeProvider theme={scheduleTheme}>
              <ListItemIcon>
                <Circle color="primary" />
              </ListItemIcon>
            </ThemeProvider>
            <ListItemText primary="Disponible" />
          </ListItem>
          <ListItem>
            <ThemeProvider theme={scheduleTheme}>
              <ListItemIcon>
                <Circle color="secondary" />
              </ListItemIcon>
            </ThemeProvider>
            <ListItemText primary="No disponible" />
          </ListItem>

          <Divider />
          <ListItem onClick={updateSchedule}>
            <ListItemButton>
              <ListItemText
                primary="Guardar cambios"
                sx={{ textAlign: "center" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={fetchSchedule}>
              <ListItemText
                primary="Cancelar cambios"
                sx={{ textAlign: "center" }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* <Box id="box1" sx = {{ height: '100vh'}}>
            <Toolbar/>
            <Box id="box2"sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100vw'}}>
            <Box id="box3" sx={{width: '100vw'}}> */}
        {/* <Paper sx={{ width: '100%',  }}> */}
        <ScheduleTable schedule={schedule} loading={loading} />
        {/* </Box>
            </Box>
            </Box> */}
        {/* </Paper> */}
      </Stack>
    </Box>
  );
}
