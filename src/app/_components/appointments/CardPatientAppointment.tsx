"use client";
import React, { FC, useState } from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import IUser from "@/app/_interfaces/IUser";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

interface Props {
  patient: IUser;
}

export const CardPatientAppointment: FC<Props> = ({ patient }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Grid item xs={12}>
      <Card variant="outlined" className="fadeIn">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            className="fadeIn"
            image={patient.profilePicture}
            alt={patient.fullName}
            onLoad={() => setIsImageLoaded(true)}
            sx={{ width: 120, height: 120, mt: 3, borderRadius: "50%" }}
          />
        </Box>
        <CardContent>
          <Box className="fadeIn">
            <Typography
              fontWeight={FontWeightValues.Semibold}
              color="text1.main"
              align="center"
              variant="h4"
              gutterBottom
            >
              {patient.fullName}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
