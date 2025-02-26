import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import { Grid } from "@mui/material";
import React, { FC } from "react";
import { CardSessionClinicHistory } from "./CardSessionClinicHistory";

interface Props {
  appointments: IPreviousAppointment[];
}

export const SessionClinicHistoryList: FC<Props> = ({ appointments }) => {
  return (
    <Grid container spacing={3}>
      {appointments.map((appointment) => {
        return (
          <CardSessionClinicHistory
            appointment={appointment}
            key={appointment._id}
          />
        );
      })}
    </Grid>
  );
};
