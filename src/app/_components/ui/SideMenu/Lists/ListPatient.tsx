import React from "react";
import { List } from "@mui/material";
import {
  AccountCircleOutlined,
  DateRangeOutlined,
  HistoryOutlined,
  ScheduleOutlined,
} from "@mui/icons-material";
import MenuItem from "../MenuItem";

export default function ListPatient() {
  return (
    <List>
      <MenuItem label="Perfil" path="/perfil">
        <AccountCircleOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Citas pendientes" path="/citas">
        <DateRangeOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Historial de citas" path="/citas/historial">
        <HistoryOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Agendar una cita" path="/practicantes">
        <ScheduleOutlined color="secondary" />
      </MenuItem>
    </List>
  );
}
