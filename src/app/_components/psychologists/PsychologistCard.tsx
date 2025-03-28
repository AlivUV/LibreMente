"use client";
import React, { FC } from "react";
import { Grid, Card, Box, Typography, CardContent } from "@mui/material";
import Image from "next/image";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import Roles from "@/app/_enums/Roles";
import { useSession } from "next-auth/react";
import { ContentTypes } from "./PsychologistList";
import {
  PreviousAppointmentsButton,
  ScheduleButton,
  SeeScheduleButton,
  UpcomingAppointmentsButton,
} from "./CardButtons";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

interface Props {
  psychologist: IPsychologist;
  setContent: ({ type, content }: { type: ContentTypes; content: any }) => void;
}

export const PsychologistCard: FC<Props> = ({ psychologist, setContent }) => {
  const { data: session } = useSession();
  const buttons = (() => {
    const buttons: React.JSX.Element[] = [];
    switch (session?.user.role!) {
      case Roles.Consultante:
        buttons.push(<ScheduleButton psychologistSlug={psychologist.slug} />);
        break;
      case Roles.Tutor:
      case Roles.Monitor:
      case Roles.Administrador:
        buttons.push(
          <UpcomingAppointmentsButton psychologistId={psychologist._id!} />,
          <PreviousAppointmentsButton psychologistId={psychologist._id!} />
        );
      default:
    }
    buttons.push(
      <SeeScheduleButton
        psychologistId={psychologist._id!}
        setContent={setContent}
      />
    );
    return buttons;
  })();

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card variant="outlined" className="fadeIn">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={psychologist.profilePicture}
            alt={Roles.Practicante}
            width={120}
            height={120}
            style={{
              marginTop: 3,
              border: "2px solid #EA6F13",
              borderRadius: "50%",
            }}
          />
        </Box>
        <CardContent>
          <Box sx={{ display: "block" }} className="fadeIn">
            <Typography
              height={"4rem"}
              fontWeight={FontWeightValues.Semibold}
              color="primary.main"
              align="center"
              variant="h5"
              gutterBottom
            >
              {psychologist.fullName}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {buttons}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
