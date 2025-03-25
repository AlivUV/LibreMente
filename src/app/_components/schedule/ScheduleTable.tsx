"use client";

import { days, hours } from "@/app/_utils/constants";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CellButton from "./CellButton";
import { IDay } from "@/app/_interfaces/schedule/IDay";
import { scheduleTheme } from "@/app/_themes/schedule-theme";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function ScheduleTable({
  schedule,
  readOnly,
  loading,
}: {
  loading?: boolean;
  schedule: IDay[];
  readOnly?: boolean;
}) {
  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table size="small" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {days.map((day) => (
              <TableCell
                key={`header${day}`}
                sx={{
                  backgroundColor: "#EA6F13",
                  color: "white",
                  borderLeft: 1,
                  fontWeight: FontWeightValues.Semibold,
                }}
                align="center"
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {hours.map((hour) => (
            <TableRow key={`fila${hour}`}>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  background: "white",
                  zIndex: 800,
                  color: "#666666",
                }}
              >
                {hour.getString()}
              </TableCell>
              {days.map((day, index) => {
                let color: string | undefined;
                if (readOnly) {
                  color = schedule[index].hours[hour.getValue()]
                    ? scheduleTheme.palette.primary.main
                    : scheduleTheme.palette.secondary.main;
                }
                return (
                  <TableCell
                    key={day + hour.getString()}
                    sx={{
                      paddingTop: 0,
                      paddingBottom: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      opacity: "42%",
                      backgroundColor: color,
                      borderLeft: 1,
                      borderRight: index === days.length - 1 ? 1 : 0,
                      borderColor: "#e0e0e0",
                    }}
                  >
                    {!readOnly && (
                      <CellButton
                        initialSelected={schedule[index].hours[hour.getValue()]}
                        day={index}
                        hour={hour.getValue()}
                        schedule={schedule}
                        loading={loading}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
