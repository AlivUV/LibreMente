import { List } from "@mui/material";
import MenuItem from "../MenuItem";
import {
  AccountCircleOutlined,
  FeedOutlined,
  SupervisorAccountOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";

export default function ListTutor() {
  return (
    <List>
      <MenuItem label="Perfil" path="/perfil">
        <AccountCircleOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Dar Aval" path="/solicitudes">
        <ThumbUpOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Mis Practicantes" path="/practicantes">
        <SupervisorAccountOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Reportes" path="/reportes">
        <FeedOutlined color="secondary" />
      </MenuItem>
    </List>
  );
}
