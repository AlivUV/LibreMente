import React, { FC } from "react";
import NextLink from "next/link";
// import { Typography, Box, Link, Button } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Link from "@mui/material/Link/Link";
import Button from "@mui/material/Button/Button";
import { EventBusy } from "@mui/icons-material";
import { getMyServerSession } from "@/app/_utils/next-auth";
import Roles from "@/app/_enums/Roles";

interface Props {
  message: string;
}

export const EmptyAppointment: FC<Props> = async ({ message }) => {
  const session = await getMyServerSession();
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
        <EventBusy sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography align="center" gutterBottom>
            {message}
          </Typography>
          {session?.user.role === Roles.Consultante && (
            <NextLink href={`/practicantes`} passHref prefetch={false}>
              {/* <Link> */}
              <Button color="secondary" className="card-btn">
                Pide tu cita aquí
              </Button>
              {/* </Link> */}
            </NextLink>
          )}
        </Box>
      </Box>
    </Box>
  );
};
