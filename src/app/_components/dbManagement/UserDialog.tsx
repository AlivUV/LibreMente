import { FontWeightValues } from "@/app/_enums/FontWeightValues";
import Roles from "@/app/_enums/Roles";
import IUser from "@/app/_interfaces/IUser";
import { saveUserById } from "@/app/_utils/server actions/user";
import { Cancel, Check, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import StateDialog from "./StateDialog";
import { toast } from "react-toastify";
import { sendNotification } from "@/app/_utils/server actions/notification";
import { ReceiverTypes } from "@/app/_enums/ReceiverTypes";
import { NotificationTypes } from "@/app/_enums/NotificationTypes";

export default function UserDialog({
  index,
  users,
  open,
  handleClose,
}: {
  index?: number;
  users: IUser[];
  open: boolean;
  handleClose: () => void;
}) {
  const dbUser = index === undefined ? index : users[index];
  const [editingAssignedUsers, setEditingAssignedUsers] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [editingResponsibleUser, setEditingResponsibleUser] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const responsibleUserCounts: Record<string, number> = {};
  const indexedUsers = users.map((user, index) => {
    if (user.responsibleUser) {
      const key = user.responsibleUser;
      if (!responsibleUserCounts[key]) responsibleUserCounts[key] = 0;
      responsibleUserCounts[key] += 1;
    }
    return { ...user, index };
  });
  const assignedUsers = indexedUsers
    .filter((user) => user.responsibleUser === dbUser?._id)
    .map((user) => ({
      id: user._id,
      label: user.fullName,
      index: user.index,
    }));
  let newAssignedUsers: typeof assignedUsers;
  const baseResponsibleUser = indexedUsers.find(
    (user) => user._id === dbUser?.responsibleUser
  );
  const responsibleUser = baseResponsibleUser && {
    id: baseResponsibleUser?._id,
    label: baseResponsibleUser?.fullName,
    index: baseResponsibleUser?.index,
  };
  let newResponsibleUser: typeof responsibleUser;
  let newRole: Roles;

  function editAssignedUsers() {
    if (editingAssignedUsers) {
      Promise.all(
        assignedUsers.map((user) => {
          users[user.index].responsibleUser = undefined;
          return saveUserById(user.id!, { $unset: { responsibleUser: 1 } });
        })
      )
        .then(() =>
          Promise.all(
            newAssignedUsers.map((user) => {
              const newId = dbUser?._id;
              users[user.index].responsibleUser = newId;
              return saveUserById(user.id!, { responsibleUser: newId });
            })
          )
        )
        .then(() => {
          setEditingAssignedUsers(false);
        });
    } else {
      setEditingAssignedUsers(true);
    }
  }
  function editRole() {
    if (!editingRole || !dbUser) {
      return setEditingRole(true);
    }
    if (!newRole) {
      toast.dismiss();
      toast.info("No se seleccionó un rol diferenete.");
      return setEditingRole(false);
    }
    if (newRole === dbUser.role) {
      toast.dismiss();
      toast.info("No se seleccionó un rol diferenete");
      return setEditingRole(false);
    }

    toast.loading("Intentando cambiar el rol...");
    saveUserById(dbUser._id!, { role: newRole })
      .then(() => {
        toast.dismiss();
        toast.success("El rol fue cambiado con éxito.");
        sendNotification(
          {
            type: ReceiverTypes.User,
            id: dbUser._id!,
          },
          `El administrador ha cambiado tu rol a ${newRole}`,
          true,
          dbUser.profilePicture,
          {
            notificationType: NotificationTypes.RoleChange,
            clues: [],
          }
        );
        dbUser.role = newRole;
        users[index!].role = newRole;
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Ocurrió un error al intentar cambiar el rol.");
      })
      .finally(() => setEditingRole(false));
  }
  function editResponsibleUser() {
    if (editingResponsibleUser && dbUser) {
      const newId = newResponsibleUser?.id;
      if (index !== undefined) users[index].responsibleUser = newId;
      saveUserById(
        dbUser._id!,
        newId ? { responsibleUser: newId } : { $unset: { responsibleUser: 1 } }
      ).then(() => setEditingResponsibleUser(false));
    } else {
      setEditingResponsibleUser(true);
    }
  }
  if (dbUser) {
    const responsibleUserOptions = indexedUsers
      .filter((user) => {
        switch (dbUser.role) {
          case Roles.Practicante:
            return (
              user.role === Roles.Tutor &&
              (!responsibleUserCounts[user._id!] ||
                responsibleUserCounts[user._id!] <= 5)
            );

          case Roles.Tutor:
            return (
              user.role === Roles.Monitor &&
              (!responsibleUserCounts[user._id!] ||
                responsibleUserCounts[user._id!] <= 5)
            );
          default:
            return false;
        }
      })
      .map((user) => ({
        id: user._id,
        label: user.fullName,
        index: user.index,
      }));
    const assignedUsersOptions = indexedUsers
      .filter((user) => {
        switch (dbUser.role) {
          case Roles.Tutor:
            return user.role === Roles.Practicante && !user.responsibleUser;
          case Roles.Monitor:
            return user.role === Roles.Tutor && !user.responsibleUser;
          default:
            return false;
        }
      })
      .map((user) => ({
        id: user._id,
        label: user.fullName,
        index: user.index,
      }));
    const user = {
      Nombres: dbUser.firstName,
      Apellidos: dbUser.lastName,
      Correo: dbUser.email,
      Rol: dbUser.role,
      Teléfono: dbUser.phone ?? "No registrado",
      Estado: dbUser.state,
      Género: dbUser.gender ?? "No registrado",
      "Registrado el": format(new Date(dbUser.createdAt!), "PPPPp", {
        locale: es,
      }),
      "Última sesión": format(new Date(dbUser.updatedAt!), "PPPPp", {
        locale: es,
      }),
      Carrera: dbUser.career ?? undefined,
      Semestre: dbUser.semester ?? undefined,
      "Usuarios asignados": assignedUsers,
      "Usuario responsable": responsibleUser,
    };
    return (
      <Dialog open={open} onClose={handleClose} sx={{ overflow: "auto" }}>
        {index !== undefined && (
          <StateDialog
            open={subOpen}
            onClose={() => setSubOpen(false)}
            users={users}
            index={index}
          />
        )}
        <DialogTitle fontWeight={FontWeightValues.Bold} color="secondary">
          {dbUser.fullName}
        </DialogTitle>
        <DialogContent sx={{ color: "#666666" }}>
          <Grid container spacing={1}>
            {Object.entries(user).map(([key, value], index) => {
              //Campos interactivos
              switch (key) {
                case "Usuarios asignados":
                  return (
                    (user.Rol === Roles.Tutor ||
                      user.Rol === Roles.Monitor) && (
                      <>
                        {index > 0 && (
                          <Grid xs={12}>
                            <Divider />
                          </Grid>
                        )}
                        <Grid item key={`${key}:key`} xs={4}>
                          <Typography
                            fontWeight={FontWeightValues.Semibold}
                            color={"primary.main"}
                          >
                            {key + ":"}
                          </Typography>
                        </Grid>
                        <Grid item key={`${key}:value`} xs={6}>
                          <Autocomplete
                            multiple
                            size="small"
                            fullWidth
                            defaultValue={assignedUsers}
                            readOnly={!editingAssignedUsers}
                            options={assignedUsersOptions}
                            onChange={(e, newValue) =>
                              (newAssignedUsers = [...newValue])
                            }
                            renderInput={(params) => (
                              <TextField {...params} label={key} />
                            )}
                          />
                        </Grid>
                        <Grid item key={`${key}:value`} xs={2} display="flex">
                          <IconButton
                            color="secondary"
                            onClick={editAssignedUsers}
                          >
                            {editingAssignedUsers ? <Check /> : <Edit />}
                          </IconButton>
                          <IconButton
                            disabled={!editingAssignedUsers}
                            onClick={() => setEditingAssignedUsers(false)}
                          >
                            <Cancel />
                          </IconButton>
                        </Grid>
                      </>
                    )
                  );
                case "Usuario responsable":
                  return (
                    (user.Rol === Roles.Practicante ||
                      user.Rol === Roles.Tutor) && (
                      <>
                        {index > 0 && (
                          <Grid xs={12}>
                            <Divider />
                          </Grid>
                        )}
                        <Grid item xs={4}>
                          <Typography
                            fontWeight={FontWeightValues.Semibold}
                            color={"primary.main"}
                          >
                            {key + ":"}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            disabled={!editingResponsibleUser}
                            size="small"
                            fullWidth
                            defaultValue={responsibleUser}
                            options={responsibleUserOptions}
                            onChange={(e, newValue) =>
                              (newResponsibleUser = newValue ?? undefined)
                            }
                            renderInput={(params) => (
                              <TextField {...params} label={key} />
                            )}
                          />
                        </Grid>
                        <Grid item key={`${key}:value`} xs={2}>
                          <IconButton
                            color="secondary"
                            onClick={editResponsibleUser}
                          >
                            {editingResponsibleUser ? <Check /> : <Edit />}
                          </IconButton>
                          <IconButton
                            disabled={!editingResponsibleUser}
                            onClick={() => setEditingResponsibleUser(false)}
                          >
                            <Cancel />
                          </IconButton>
                        </Grid>
                      </>
                    )
                  );
                case "Estado":
                  return (
                    value && (
                      <>
                        {index > 0 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                        <Grid item xs={4}>
                          <Typography
                            fontWeight={FontWeightValues.Semibold}
                            color={"primary.main"}
                          >
                            {key + ":"}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {value.toString()}
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            color="secondary"
                            onClick={() => setSubOpen(true)}
                          >
                            <Edit />
                          </IconButton>
                        </Grid>
                      </>
                    )
                  );
                case "Rol":
                  return (
                    value && (
                      <>
                        {index > 0 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                        <Grid item xs={4}>
                          <Typography
                            fontWeight={FontWeightValues.Semibold}
                            color={"primary.main"}
                          >
                            {key + ":"}
                          </Typography>
                        </Grid>
                        {editingRole ? (
                          <Grid item xs={6}>
                            <Autocomplete
                              size="small"
                              fullWidth
                              defaultValue={value + ""}
                              options={[
                                Roles.Consultante,
                                Roles.Practicante,
                                Roles.Tutor,
                                Roles.Monitor,
                              ]}
                              onChange={(_, newValue) =>
                                (newRole =
                                  (newValue as Roles) ?? (value as Roles))
                              }
                              renderInput={(params) => (
                                <TextField {...params} label={key} />
                              )}
                            />
                          </Grid>
                        ) : (
                          <Grid item xs={6}>
                            {value.toString()}
                          </Grid>
                        )}
                        <Grid xs={2} alignContent={"center"}>
                          <IconButton color="secondary" onClick={editRole}>
                            {editingRole ? <Check /> : <Edit />}
                          </IconButton>
                          <IconButton
                            disabled={!editingRole}
                            onClick={() => setEditingRole(false)}
                          >
                            <Cancel />
                          </IconButton>
                        </Grid>
                      </>
                    )
                  );
                default:
                  return (
                    value && (
                      <>
                        {index > 0 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                        <Grid item xs={4}>
                          <Typography
                            fontWeight={FontWeightValues.Semibold}
                            color={"primary.main"}
                          >
                            {key + ":"}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          {value.toString()}
                        </Grid>
                      </>
                    )
                  );
              }
            })}
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
  return null;
}
