import Roles from "@/app/_enums/Roles";
import { UserStates } from "@/app/_enums/UserStates";
import IUser from "@/app/_interfaces/IUser";
import {
  saveUserById,
  saveUserStateById,
} from "@/app/_utils/server actions/user";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";

export default function StateDialog({
  open,
  onClose,
  users,
  index,
}: {
  open: boolean;
  onClose: () => void;
  users: IUser[];
  index: number;
}) {
  const user = users[index];

  const [title, content, action, newState] = (() => {
    let title, content, action: string;
    let newState: UserStates;
    switch (user.state) {
      case UserStates.Activo:
        title = `¿Desea desactivar al usuario ${user.fullName}?`;
        content =
          "El usuario no podrá ingresar a la plataforma ni interactuar con los demás usuarios";
        action = "Desactivar";
        newState = UserStates.Inactivo;
        break;
      case UserStates.Inactivo:
        title = `¿Desea activar al usuario ${user.fullName}?`;
        content =
          "El usuario podrá ingresar a la plataforma con su último rol activo e interactuar con los demás usuarios";
        action = "Activar";
        newState = UserStates.Activo;
    }
    return [title, content, action, newState];
  })();
  function handleChange() {
    toast
      .promise(
        saveUserStateById(user._id!, newState, user.role === Roles.Practicante),
        {
          pending: "Actualizando el estado del usuario...",
          success: "Estado del usuario actualizado exitosamente",
          error: "Ha ocurrido un error al actualizar el estado del usuario",
        }
      )
      .then(() => {
        users[index].state = newState;
        onClose();
      });
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleChange} color="secondary">
          {action}
        </Button>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
