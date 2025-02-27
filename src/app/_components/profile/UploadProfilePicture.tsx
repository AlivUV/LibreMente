import React, { FC } from "react";
import { Box, Avatar } from "@mui/material";

interface Props {
  url: string;
}

export const UploadProfilePicture: FC<Props> = ({ url }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ alignItems: "center", justifyContent: "center", mb: 4 }}
    >
      <Avatar
        alt="Patient"
        src={url}
        sx={{ width: 120, height: 120, mb: 2 }}
        slotProps={{ img: { referrerPolicy: "no-referrer" } }}
      />
    </Box>
  );
};
