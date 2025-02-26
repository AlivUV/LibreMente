"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
} from "@mui/material";
import "date-fns";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowForwardIosSharp } from "@mui/icons-material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import { INote } from "@/app/_interfaces/INote";
import { fetchNotesByAppointment } from "@/app/_utils/server actions/note";
import NotesCard from "../appointments/NotesCard";

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharp sx={{ fontSize: "0.8rem" }} color="secondary" />
    }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    marginRight: theme.spacing(0.1),
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

interface Props {
  appointment: IPreviousAppointment;
}

export const CardSessionClinicHistory: FC<Props> = ({ appointment }) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  useEffect(() => {
    fetchNotesByAppointment(appointment._id!).then((notes) => setNotes(notes));
  }, [appointment._id, setNotes]);
  return (
    <Grid item xs={12}>
      <Card sx={{ p: 1 }} variant="outlined" className="fadeIn">
        <CardContent sx={{ pl: 1, pr: 1, pt: 1, pb: 0 }}>
          <Typography variant="h6" color="text.secondary" component="div">
            {`Fecha: ${format(new Date(appointment.date), "EEEE dd", {
              locale: es,
            })} de ${format(new Date(appointment.date), "MMMM yyyy", {
              locale: es,
            })}`}
          </Typography>
          {notes.length === 0 ? (
            <Typography variant="body1" component="div" gutterBottom>
              No tienes notas en esta sesión
            </Typography>
          ) : (
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary>
                <Typography variant="body1" color="secondary" component="div">
                  Ver notas de la sesión
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NotesCard notes={notes} />
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
