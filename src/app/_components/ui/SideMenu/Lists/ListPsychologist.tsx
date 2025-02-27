import React from "react";
import {
  AccountCircleOutlined,
  DateRangeOutlined,
  EditCalendar,
  HistoryOutlined,
  SupervisedUserCircleOutlined,
  TextSnippetOutlined,
} from "@mui/icons-material";
import { List } from "@mui/material";
import MenuItem from "../MenuItem";

export default function ListPsychologist() {
  return (
    <List>
      <MenuItem label="Perfil" path="/perfil">
        <AccountCircleOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Configurar agenda" path="/agenda">
        <EditCalendar color="secondary" />
      </MenuItem>
      <MenuItem label="Citas pendientes" path="/citas">
        <DateRangeOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Historial de citas" path="/citas/historial">
        <HistoryOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Mis pacientes" path="/consultantes">
        <SupervisedUserCircleOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Mis notas" path="/notas">
        <TextSnippetOutlined color="secondary" />
      </MenuItem>
    </List>
  );
}
