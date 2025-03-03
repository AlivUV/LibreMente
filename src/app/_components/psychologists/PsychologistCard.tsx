"use client";
import React, { FC } from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { useRouter } from "next/navigation";
import GoogleImage from "../ui/GoogleImage";
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
  const router = useRouter();
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
          <CardMedia
            component={GoogleImage}
            compSrc={psychologist.profilePicture}
            compAlt={Roles.Practicante}
            compStyle={{
              width: 120,
              height: 120,
              marginTop: 3,
              borderRadius: "50%",
            }}
          />
        </Box>
        <CardContent>
          <Box sx={{ display: "block" }} className="fadeIn">
            <Typography
              fontWeight={FontWeightValues.Semibold}
              color="text1"
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
