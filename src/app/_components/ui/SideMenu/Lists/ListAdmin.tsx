import { List } from "@mui/material";
import MenuItem from "../MenuItem";
import {
  AccountCircleOutlined,
  FeedOutlined,
  StorageOutlined,
  SupervisorAccountOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";

export default function ListAdmin() {
  return (
    <List>
      <MenuItem label="Perfil" path="/perfil">
        <AccountCircleOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Dar Aval" path="/solicitudes">
        <ThumbUpOutlined color="secondary" />
      </MenuItem>
      {/* <MenuItem label="Monitores" path="">
        <SupervisorAccountOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Tutores" path="">
        <SupervisorAccountOutlined color="secondary" />
      </MenuItem> */}
      <MenuItem label="Practicantes" path="/practicantes">
        <SupervisorAccountOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Reportes" path="/reportes">
        <FeedOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Administrar Base de Datos" path="/base_de_datos">
        <StorageOutlined color="secondary" />
      </MenuItem>
      {/* <MenuItem label="Crear Especialidades" path="">
        <AddCircleOutlineOutlined color="secondary" />
      </MenuItem> */}
    </List>
  );
}
