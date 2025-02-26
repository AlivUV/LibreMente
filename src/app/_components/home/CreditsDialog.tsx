import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function CreditsDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Créditos</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography
            variant="subtitle1"
            fontWeight={FontWeightValues.Semibold}
          >
            Ingeniero de Desarrollo
          </Typography>
          <Typography variant="body1">Samuel Riascos Prieto</Typography>
          <br />
          <Typography
            variant="subtitle1"
            fontWeight={FontWeightValues.Semibold}
          >
            Diseño Gráfico
          </Typography>
          <Typography variant="body1">Marysol Córdoba Díaz</Typography>
          <br />
          <Typography>
            Basado en el proyecto Psicológicamente de Hector Mauricio Muñoz
            Ordoñez
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
