import PageHeader from "../_components/PageHeader";
import { getUsers } from "../_database/daos/userDao";
import UsersDataGrid from "../_components/dbManagement/UsersDataGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base de datos",
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
