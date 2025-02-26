"use client";
import IUser from "@/app/_interfaces/IUser";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { useState } from "react";
import TutorDialog from "./TutorDialog";

const defaultRow = {
  Apellidos: "",
  Nombres: "",
  Correo: "",
  Estado: "",
};

export default function TutorsDataGrid({ tutors }: { tutors: IUser[] }) {
  const columns: GridColDef[] = Object.keys(defaultRow).map((key) => ({
    field: key,
    renderHeader: () => <strong>{key}</strong>,
  }));
  const rows = tutors.map((tutor, index) => ({
    id: index,
    Apellidos: tutor.lastName,
    Nombres: tutor.firstName,
    Correo: tutor.email,
    Estado: tutor.state,
  }));
  const apiRef = useGridApiRef();
  const [open, setOpen] = useState(false);
  const [selectedTutorIndex, setSelectedTutorIndex] = useState(0);
  return (
    <>
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        autosizeOnMount
        onRowClick={(params) => {
          setSelectedTutorIndex(params.id as number);
          setOpen(true);
          apiRef.current.autosizeColumns();
        }}
      />
      {tutors.length && (
        <TutorDialog
          open={open}
          handleClose={() => {
            setOpen(false);
            apiRef.current.autosizeColumns();
          }}
          tutor={tutors[selectedTutorIndex]}
        />
      )}
    </>
  );
}
