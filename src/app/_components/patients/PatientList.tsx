import IUser from "@/app/_interfaces/IUser";
import { Grid } from "@mui/material";
import React, { FC } from "react";
import { PatientCard } from "./PatientCard";
// import { IUser } from "../../interfaces";
// import { PatientCard } from "./PatientCard";

interface Props {
  patients: IUser[];
}

export const PatientList: FC<Props> = ({ patients }) => {
  return (
    <Grid container spacing={4}>
      {patients.map((patient) => (
        <PatientCard patient={patient} key={patient._id} />
      ))}
    </Grid>
  );
};
