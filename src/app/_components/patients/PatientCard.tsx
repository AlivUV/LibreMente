"use client";
import React, { FC } from "react";
import NextLink from "next/link";
import {
  Grid,
  Card,
  Box,
  Typography,
  Button,
  CardContent,
  CardMedia,
} from "@mui/material";
import IUser from "@/app/_interfaces/IUser";
import GoogleImage from "../ui/GoogleImage";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

interface Props {
  patient: IUser;
}

export const PatientCard: FC<Props> = ({ patient }) => {
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
            compSrc={patient.profilePicture!}
            compAlt={patient.fullName}
            compStyle={{
              width: 120,
              height: 120,
              marginTop: 3,
              borderRadius: "50%",
            }}
          />
        </Box>
        <CardContent>
          <Box className="fadeIn">
            <Typography
              fontWeight={FontWeightValues.Semibold}
              color="inherit"
              align="center"
              variant="h6"
              gutterBottom
            >
              {`${patient.firstName} ${patient.lastName}`}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <NextLink
                href={`/consultantes/${patient._id}`}
                passHref
                prefetch={false}
              >
                <Button
                  size="small"
                  color="secondary"
                  className="card-btn"
                  sx={{ mb: 2 }}
                >
                  Ver historia clínica
                </Button>
              </NextLink>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
