"use client";
import { Dialog, DialogTitle, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { PsychologistCard } from "./PsychologistCard";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import ScheduleTable from "../schedule/ScheduleTable";

export enum ContentTypes {
  Schedule,
  Comments,
}

export const PsychologistList = ({
  psychologists,
}: {
  psychologists: IPsychologist[];
}) => {
  console.log("Hola, soy la lista");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<{
    type: ContentTypes;
    content: any;
  }>();
  function handleContent(newContent: typeof content) {
    setContent(newContent);
    setOpen(true);
  }

  return (
    <>
      <Grid container spacing={4}>
        {psychologists.map((psychologist) => (
          <PsychologistCard
            psychologist={psychologist}
            key={psychologist.slug}
            setContent={handleContent}
          />
        ))}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agenda</DialogTitle>
        {content?.type === ContentTypes.Comments && null}
        {content?.type === ContentTypes.Schedule && content.content && (
          <ScheduleTable schedule={content.content} readOnly />
        )}
        {content?.type === ContentTypes.Schedule && !content.content && (
          <Typography sx={{ padding: "2rem" }}>
            El practicante no tiene agenda disponible en este momento.
          </Typography>
        )}
      </Dialog>
    </>
  );
};
