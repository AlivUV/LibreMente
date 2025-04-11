"use client";
import { hasPendingRequests } from "@/app/_utils/server actions/request";
import { Box, Container, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PatientLayout from "../layout/PatientLayout";
import { PersonalInfo } from "./PersonalInfo";
import { UploadProfilePicture } from "./UploadProfilePicture";

export default function ProfileDisplay() {
  const { data: session } = useSession();
  const [fileState, setFileState] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(true);
  useEffect(() => {
    if (session) {
      hasPendingRequests(session.user._id!).then((value) =>
        setPendingRequests(value)
      );
    }
  }, [session, setPendingRequests]);
  return (
    <PatientLayout
      title="Mi perfil"
      pageDescription={"Configuración de perfil"}
    >
      <Box sx={{ margin: "80px auto", padding: "0px 10px" }}>
        <Container component="main" maxWidth="sm">
          <UploadProfilePicture
            url={session?.user.profilePicture!}
            updating={updating}
            fileState={fileState}
            setFileState={setFileState}
          />
          <Grid container spacing={2}>
            <Grid item>
              <PersonalInfo
                user={session?.user!}
                updating={updating}
                setUpdating={setUpdating}
                pictureState={fileState}
                pendingRequest={pendingRequests}
                setPendingRequest={setPendingRequests}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PatientLayout>
  );
}
