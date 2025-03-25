import React, { FC, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import IUser from "@/app/_interfaces/IUser";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RoleChangeModal from "../role/RoleChangeModal";
import FieldForm from "./FieldForm";
import ProfileFieldContext from "@/app/_contexts/ProfileFieldContext";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

interface Props {
  user: IUser;
  pendingRequest: boolean;
  setPendingRequest: (value: boolean) => void;
}

export const PersonalInfo: FC<Props> = ({
  user,
  pendingRequest,
  setPendingRequest,
}) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    // <form /* onSubmit={handleSubmit(onUpdateUser)} */ noValidate>
    <ProfileFieldContext.Provider
      value={{ updating, pendingRequest, setPendingRequest, setModalOpen }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Typography
              variant="h6"
              component="h6"
              color={"primary.main"}
              fontWeight={FontWeightValues.Bold}
              sx={{ fontSize: { xs: 16, md: 20 } }}
            >
              Información personal
            </Typography>

            <Box flex={1} />

            {!updating && (
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  setUpdating(true);
                }}
                sx={{ fontWeight: FontWeightValues.Bold }}
              >
                Editar
              </Button>
            )}

            {updating && (
              <Button
                size="small"
                onClick={() => {
                  setUpdating(false);
                  // reset();
                }}
                sx={{ fontWeight: FontWeightValues.Bold }}
              >
                Cancelar
              </Button>
            )}

            {updating && (
              <Button
                type="submit"
                color="secondary"
                size="small"
                disabled={loading}
                form="profileForm"
                sx={{ fontWeight: FontWeightValues.Bold }}
              >
                {loading && (
                  <CircularProgress
                    size={20}
                    sx={{ position: "absolute" }}
                    color="secondary"
                  />
                )}
                Guardar
              </Button>
            )}
          </Stack>
        </Grid>
        <FieldForm setUpdating={setUpdating} />
        <RoleChangeModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
        />
      </Grid>
    </ProfileFieldContext.Provider>

    // </form>
  );
};
