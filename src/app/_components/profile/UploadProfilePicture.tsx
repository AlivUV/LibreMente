import React, { Dispatch, FC, SetStateAction } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import DropZone from "../auth/DropZone";

interface Props {
  url: string;
  updating: boolean;
  fileState: File | null;
  setFileState: Dispatch<SetStateAction<null>> | Dispatch<SetStateAction<File>>;
}

export const UploadProfilePicture: FC<Props> = ({
  url,
  updating,
  fileState,
  setFileState,
}) => {
  console.log(url);
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ alignItems: "center", justifyContent: "center", mb: 4 }}
    >
      {!updating ? (
        <Avatar
          alt="Patient"
          src={url}
          sx={{ width: 120, height: 120, mb: 2 }}
          slotProps={{ img: { referrerPolicy: "no-referrer" } }}
        />
      ) : updating && url.startsWith("https://lh3.googleusercontent.com/a") ? (
        <>
          <Avatar
            alt="Patient"
            src={url}
            sx={{ width: 120, height: 120, mb: 2 }}
            slotProps={{ img: { referrerPolicy: "no-referrer" } }}
          />
          <Typography color={"gray"}>
            La imagen se tomará de la cuenta de google
          </Typography>
        </>
      ) : (
        <DropZone
          propFileState={[fileState, setFileState]}
          title="Imagen de perfil"
        />
      )}
    </Box>
  );
};
