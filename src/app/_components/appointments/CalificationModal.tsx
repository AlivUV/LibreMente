import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Rating,
  TextField,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

interface Props {
  appointmentId?: string;
}

export const CalificationModal: FC<Props> = ({ appointmentId }) => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const [open, setOpen] = useState(false);

  const [calification, setCalification] = useState<number | null>(null);
  const [calificationComment, setCalificationComment] = useState("");

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCalificationComment(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsPosting(false);
    setCalification(null);
    setCalificationComment("");
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPosting(true);

    if (calification === 0 || calification === null) {
      setIsPosting(false);
      setCalification(0);
      return;
    }

    try {
      router.replace(`/app/citas`);
    } catch (error) {
      setIsPosting(false);
      toast.error("No fue posible calificar la cita, vuelve a intentarlo", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <>
      <Button
        size="small"
        color="secondary"
        sx={{ mt: 3 }}
        onClick={handleClickOpen}
        fullWidth
      >
        Calificar
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Calificación de la cita</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSave} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h2"
                  component="h2"
                  gutterBottom
                  sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 300 }}
                >
                  ¿Como valoras la calidad en la atención prestada?
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Rating
                  value={calification}
                  onChange={(event, newValue) => {
                    setCalification(newValue);
                  }}
                  size="large"
                />
                {calification === 0 && (
                  <Typography variant="caption" display="block" color="error">
                    Debes seleccionar una calificación de 1 a 5
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Deja tu comentario"
                  fullWidth
                  multiline
                  rows={4}
                  value={calificationComment}
                  onChange={handleChangeComment}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button onClick={handleClose} disabled={isPosting}>
                    Cancelar
                  </Button>
                  <Button color="secondary" disabled={isPosting} type="submit">
                    {isPosting && (
                      <CircularProgress
                        size={20}
                        sx={{ position: "absolute" }}
                        color="secondary"
                      />
                    )}
                    Guardar
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
