"use client";
import { IDay } from "@/app/_interfaces/schedule/IDay";
import { scheduleTheme } from "@/app/_themes/schedule-theme";
import { ThemeProvider } from "@emotion/react";
import { Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

export default function CellButton({
  initialSelected,
  day,
  hour,
  schedule,
  loading,
}: {
  initialSelected: boolean;
  day: number;
  hour: number;
  schedule: IDay[];
  loading?: boolean;
}) {
  // if (day === "Lunes" && hour === "00:00") {
  //     console.log("La primera hora es: " + initialSelected);
  // }
  const [selected, setSelected] = useState(initialSelected);
  if (initialSelected) {
    // console.log(`Estoy seleccionado: ${day}, ${hour}`);
    // console.log("mi selected es: " + selected);
  }
  useEffect(() => {
    // console.log("cambia el botón");
    setSelected(initialSelected);
  }, [initialSelected, setSelected, schedule]);
  if (loading) return <Skeleton variant="rectangular" height="32px" />;
  return (
    <ThemeProvider theme={scheduleTheme}>
      <Button
        variant="contained"
        size="large"
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          borderRadius: 0,
          minHeight: "32px",
          width: "100%",
        }}
        onClick={() => {
          schedule[day].hours[hour] = !selected;
          setSelected(!selected);
          // console.log("Cambio");
        }}
        color={selected ? "primary" : "secondary"}
      />
    </ThemeProvider>
  );
}
