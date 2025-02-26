"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState } from "react";

export default function ModalBox() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {};
  const isPosting = false;
  return (
    <>
      <Box
        // display={viewSchedule.length === 0 ? "none" : "flex"}
        flexDirection="column"
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Button
          size="large"
          color="secondary"
          sx={{ mt: 3 }}
          // disabled={
          //     service === "" ||
          //     hour === "" ||
          //     date === null ||
          //     service === null ||
          //     hour === null
          // }
          // onClick={handleClickOpen}
        >
          Siguiente
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detalles de tu cita</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Servicio:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {/* {serviceSelected[0].name} */}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Psicólogo:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {/* {psychologist.fullName} */}
                      Un nombre X
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Fecha y hora:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {/* {hour &&
                        `${format(date, "EEEE dd", {
                          locale: es,
                        })} de ${format(date, "MMMM yyyy", {
                          locale: es,
                        })} - ${convertTime(hour)}`} */}
                      Aquí va alguna hora
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Duración:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {/* {`${serviceSelected[0].duration} min`} */}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Monto a pagar:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {/* {`${formatCurrency(serviceSelected[0].cost)} ${
                        serviceSelected[0].currency
                      }`} */}
                      Aquí va el precio
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <DialogContentText>
            Al confirmar la cita estas aceptando los términos y condiciones de
            Psicologicamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPosting}>
            Cancelar
          </Button>
          <Button color="secondary" onClick={handleSave} disabled={isPosting}>
            {isPosting && (
              <CircularProgress
                size={20}
                sx={{ position: "absolute" }}
                color="secondary"
              />
            )}
            Confirmar cita
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
