import IUser from "@/app/_interfaces/IUser";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function TutorDialog({
  tutor: tutorData,
  open,
  handleClose,
}: {
  tutor: IUser;
  open: boolean;
  handleClose: () => void;
}) {
  const tutor = {
    Nombres: tutorData.firstName,
    Apellidos: tutorData.lastName,
    Correo: tutorData.email,
    Teléfono: tutorData.phone ?? "No registrado",
    Estado: tutorData.state,
    Género: tutorData.gender ?? "No registrado",
    "Registrado el": format(new Date(tutorData.createdAt!), "PPPPp", {
      locale: es,
    }),
    "Última sesión": format(new Date(tutorData.updatedAt!), "PPPPp", {
      locale: es,
    }),
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          {Object.entries(tutor).map(
            ([key, value], index) =>
              value && (
                <>
                  {index > 0 && (
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  )}
                  <Grid item xs={4}>
                    <Typography>
                      <b>{key + ":"}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {value.toString()}
                  </Grid>
                </>
              ),
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
