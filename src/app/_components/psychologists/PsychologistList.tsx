"use client";
import { Dialog, DialogTitle, Grid } from "@mui/material";
import React, { useState } from "react";
// import { IPsychologist } from "../../interfaces";
import { PsychologistCard } from "./PsychologistCard";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import ScheduleTable from "../schedule/ScheduleTable";

interface Props {
  psychologists: IPsychologist[];
}

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
  // const session = await getMyServerSession();
  // const psychologists =
  //   session?.user.role === Roles.Tutor
  //     ? await getPsychologistsByTutor(session.user._id!)
  //     : await getPsychologists();
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
        {content?.type === ContentTypes.Schedule && (
          <ScheduleTable schedule={content.content} readOnly />
        )}
      </Dialog>
    </>
  );
};
