"use client";
import React, { FC } from "react";
import NextLink from "next/link";
import { Typography, Box, Link, Button } from "@mui/material";
import { PersonOff } from "@mui/icons-material";

interface Props {
  message: string;
}

export const EmptyPatient: FC<Props> = ({ message }) => {
  return (
    <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 400px)"
        flexDirection="column"
        className="fadeIn"
      >
        <PersonOff sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography align="center" gutterBottom>
            {message}
          </Typography>
          <NextLink href={`/psicologo/home`} passHref prefetch={false}>
            {/* <Link> */}
            <Button color="secondary" className="card-btn">
              Regresar
            </Button>
            {/* </Link> */}
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};
