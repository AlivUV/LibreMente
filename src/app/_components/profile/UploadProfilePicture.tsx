import React, { ChangeEvent, FC, useRef, useState } from "react";
import { Box, Button, CircularProgress, Avatar } from "@mui/material";
// import { psiApi } from "../../axios-api";
import { toast } from "react-toastify";
import { Upload } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface Props {
  url: string;
}

export const UploadProfilePicture: FC<Props> = ({ url }) => {
  console.log("La url que estoy recibiendo es:" + url);
  // const router = useRouter();
  // const refreshData = () => {
  //   // router.replace(router.asPath);
  // };
  // const [loadingUpload, setLoadingUpload] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
  //   setLoadingUpload(true);
  //   if (!target.files || target.files.length === 0) {
  //     setLoadingUpload(false);
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", target.files[0]);
  //     /* const { data } = await psiApi.post<{ message: string }>(
  //       "/user/upload-profile-picture",
  //       formData
  //     ); */
  //     refreshData();
  //     setLoadingUpload(false);
  //     /* toast.success(data.message, {
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     }); */
  //   } catch (error) {
  //     setLoadingUpload(false);
  //     toast.error("No fue posible cambiar la imagen, vuelve a intentarlo", {
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //     console.log(error);
  //   }
  // };

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
      {/* <Button
        variant="outlined"
        color="secondary"
        startIcon={<Upload />}
        disabled={loadingUpload}
        onClick={() => fileInputRef.current?.click()}
      >
        {loadingUpload && (
          <CircularProgress
            size={20}
            sx={{ position: "absolute" }}
            color="secondary"
          />
        )}
        Cambiar foto
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        onChange={onFileSelected}
      /> */}
    </Box>
  );
};
