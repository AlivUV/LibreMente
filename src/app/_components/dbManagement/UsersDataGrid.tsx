"use client";
import IUser from "@/app/_interfaces/IUser";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import UserDialog from "./UserDialog";
import { useState } from "react";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

const defaultRow = {
  Apellidos: "",
  Nombres: "",
  Correo: "",
  Rol: "",
  Estado: "",
};

type IRow = typeof defaultRow;

export default function UsersDataGrid({ users }: { users: IUser[] }) {
  const columns: GridColDef[] = Object.keys(defaultRow).map((key) => ({
    field: key,
    headerName: key,
  }));
  const rows = users.map((user, index) => ({
    id: index,
    Apellidos: user.lastName,
    Nombres: user.firstName,
    Correo: user.email,
    Rol: user.role,
    Estado: user.state,
  }));
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [open, setOpen] = useState(false);
  const apiRef = useGridApiRef();
  return (
    <>
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        autosizeOnMount
        sx={{
          "& .MuiDataGrid-columnHeader *": {
            fontWeight: FontWeightValues.Semibold,
            color: "primary.main",
          },
          color: "#666666",
        }}
        onRowClick={(params) => {
          setSelectedIndex(params.id as number);
          setOpen(true);
          apiRef.current.autosizeColumns();
        }}
      />
      <UserDialog
        index={selectedIndex}
        users={users}
        open={open}
        handleClose={() => {
          setOpen(false);
          apiRef.current.autosizeColumns();
        }}
      />
    </>
  );
}
