import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  appointmentId: string;
}

export const PsychologistDidNotAttend: FC<Props> = ({ appointmentId }) => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const handleCancel = () => {
    setIsPosting(false);
    router.replace(`/app/citas`);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {};

  return (
    <form onSubmit={handleSave} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            align="center"
            sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 300 }}
          >
            ¿El psicólogo asistió a tu cita?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={handleCancel} disabled={isPosting} color="inherit">
              Salir
            </Button>
            <Button color="secondary" disabled={isPosting} type="submit">
              {isPosting && (
                <CircularProgress
                  size={20}
                  sx={{ position: "absolute" }}
                  color="secondary"
                />
              )}
              El psicólogo no asistió
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
