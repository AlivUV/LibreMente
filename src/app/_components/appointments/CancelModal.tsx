import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  TextField,
  Grid,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";

interface Props {
  appointmentId?: string;
}

export const CancelModal: FC<Props> = ({ appointmentId }) => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const [open, setOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const handleChangeCancelReason = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCancelReason(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsPosting(false);
    setCancelReason("");
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPosting(true);

    try {
      router.replace(`/app/citas`);
    } catch (error) {
      setIsPosting(false);
      toast.error("No fue posible cancelar la cita, vuelve a intentarlo", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <>
      <Button
        size="small"
        color="error"
        sx={{ mt: 3 }}
        onClick={handleClickOpen}
        fullWidth
      >
        Cancelar cita
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Estas a punto de cancelar tu cita</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSave} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Motivo de cancelación"
                  fullWidth
                  multiline
                  rows={4}
                  value={cancelReason}
                  onChange={handleChangeCancelReason}
                  sx={{ mt: 2 }}
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
                    Cerrar
                  </Button>
                  <Button color="error" disabled={isPosting} type="submit">
                    {isPosting && (
                      <CircularProgress
                        size={20}
                        sx={{ position: "absolute" }}
                        color="error"
                      />
                    )}
                    Cancelar cita
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
