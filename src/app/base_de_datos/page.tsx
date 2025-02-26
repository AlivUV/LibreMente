import PageHeader from "../_components/PageHeader";
import { GridColDef } from "@mui/x-data-grid";
import { getUsers } from "../_database/daos/userDao";
import UsersDataGrid from "../_components/dbManagement/UsersDataGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base de datos",
};

const defaultRow = {
  Apellidos: "",
  Nombres: "",
  Correo: "",
  Rol: "",
  Estado: "",
};

export default async function Page() {
  const users = await getUsers();
  return (
    <>
      <PageHeader header="Gestión de la Base de Datos" />
      <UsersDataGrid users={users} />
    </>
  );
}
