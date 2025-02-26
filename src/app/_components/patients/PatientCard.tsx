"use client";
import React, { FC, useState } from "react";
import NextLink from "next/link";
import {
  Grid,
  Card,
  Box,
  Typography,
  Button,
  CardContent,
  Link,
  CardMedia,
} from "@mui/material";
import IUser from "@/app/_interfaces/IUser";
import GoogleImage from "../ui/GoogleImage";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";
// import { IUser } from "../../interfaces";

interface Props {
  patient: IUser;
}

export const PatientCard: FC<Props> = ({ patient }) => {
  // const [isImageLoaded, setIsImageLoaded] = useState(false);

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
            // onLoad={() => setIsImageLoaded(true)}
            compStyle={{
              width: 120,
              height: 120,
              marginTop: 3,
              borderRadius: "50%",
            }}
          />
        </Box>
        <CardContent>
          <Box
            // sx={{ display: isImageLoaded ? "block" : "none" }}
            className="fadeIn"
          >
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
                {/* <Link> */}
                <Button
                  size="small"
                  color="secondary"
                  className="card-btn"
                  sx={{ mb: 2 }}
                >
                  Ver historia clínica
                </Button>
                {/* </Link> */}
              </NextLink>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
