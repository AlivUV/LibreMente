import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function GenderDialog({
  open,
  onClose,
  setGender,
}: {
  open: boolean;
  onClose: () => void;
  setGender: (gender: string) => void;
}) {
  function handleSubmit(formData: FormData) {
    const gender = formData.get("gender")?.toString();
    if (gender) {
      setGender(gender);
    }
    onClose();
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ fontWeight: FontWeightValues.Semibold, color: "primary.main" }}
      >
        Género personalizado
      </DialogTitle>
      <DialogContent sx={{ color: "#6666666" }}>
        <DialogContentText pb="10px">
          Por favor ingresa el género con el que te identificas
        </DialogContentText>
        <form id="genderForm" action={handleSubmit}>
          <TextField
            label="Género"
            name="gender"
            color="secondary"
            sx={{
              input: {
                fontWeight: FontWeightValues.Medium,
                color: "#666666",
              },
            }}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit" form="genderForm" color="secondary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
