"use client";
import React, { FC, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import "date-fns";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { isAppointmentTime } from "@/app/_utils/schedule";
import { useRouter } from "next/navigation";
import GoogleImage from "../ui/GoogleImage";
import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import { cancelAppointment } from "@/app/_utils/server actions/appointment";
import { sendNotification } from "@/app/_utils/server actions/notification";
import { ReceiverTypes } from "@/app/_enums/ReceiverTypes";
import Roles from "@/app/_enums/Roles";
import { useSession } from "next-auth/react";
import IUser from "@/app/_interfaces/IUser";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

interface Props {
  appointment: IUpcomingAppointment | IPreviousAppointment;
  psychologist?: IPsychologist;
  fullName: string;
  image: string;
  role: Roles | string;
  psychologistUserId?: string;
}

export const AppointmentCard: FC<Props> = ({
  appointment,
  psychologist,
  fullName,
  image,
  role,
  psychologistUserId,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const { data: session } = useSession();

  return (
    <Grid item xs={12}>
      <Card
        sx={{ display: { xs: "", sm: "flex" }, p: 2 }}
        variant="outlined"
        className="fadeIn"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardMedia
            component={GoogleImage}
            // image={image}
            // image={image}
            compAlt={fullName}
            compSrc={image}
            // onLoad={() => setIsImageLoaded(true)}
            compStyle={{
              width: 120,
              height: 120,
              margin: 1,
              borderRadius: "50%",
            }}
            // slotProps={{img: {referrerPolicy:"no-referrer"}}}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            {/* <Typography component="div" variant="subtitle1">
              {`${appointment.typeService} con`}
            </Typography> */}
            <Typography
              color="text2.main"
              component="div"
              variant="h6"
              fontWeight={FontWeightValues.Semibold}
            >
              {`${role}: ${fullName}`}
            </Typography>

            <Typography variant="subtitle1" color="text2.main" component="div">
              {`Fecha: ${format(appointment.date, "EEEE dd", {
                locale: es,
              })} de ${format(appointment.date, "MMMM yyyy", {
                locale: es,
              })}`}
            </Typography>
            <Typography variant="subtitle1" color="text2.main" component="div">
              {`Hora de inicio: ${format(appointment.date, "HH:mm a")}`}
            </Typography>
            {!(appointment as IUpcomingAppointment).roomURL && (
              <Link
                href={`/citas/historial/${appointment._id}`}
                color="secondary"
                variant="body2"
                gutterBottom
              >
                Ver información de la cita
              </Link>
            )}
            {/* {!appointment.isPaid ? (
              <Chip
                label={`Pendiente de pago`}
                color="error"
                variant="outlined"
                size="small"
                icon={<CreditCardOffOutlined />}
              />
            ) : (
              <Chip
                label={appointment.state}
                color="success"
                variant="outlined"
                size="small"
              />
            )} */}
          </CardContent>
        </Box>
        <Box flex={1} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardActions sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Stack
                direction={{ xs: "column", sm: "column" }}
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                {(appointment as IUpcomingAppointment).roomURL && (
                  <>
                    {[
                      Roles.Consultante,
                      Roles.Practicante,
                      Roles.Tutor,
                    ].includes(session?.user.role!) && (
                      <Button
                        size="small"
                        color="secondary"
                        fullWidth
                        disabled={!isAppointmentTime(appointment.date)}
                        onClick={() =>
                          router.push(`/citas/meet/${appointment._id}`)
                        }
                      >
                        Ingresar a la cita
                      </Button>
                    )}
                    {(session?.user._id === appointment.patient ||
                      session?.psychologist?._id ===
                        appointment.psychologist) && (
                      <Button
                        size="small"
                        color="error"
                        fullWidth
                        disabled={isAppointmentTime(appointment.date)}
                        onClick={() => setOpen(true)}
                      >
                        Cancelar cita
                      </Button>
                    )}
                    <Dialog open={open} onClose={() => setOpen(false)}>
                      <DialogContent>
                        <DialogContentText>
                          ¿Estás seguro de cancelar esta cita? Si lo deseas,
                          puedes escribir el motivo:
                        </DialogContentText>
                      </DialogContent>
                      <TextField
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                      />
                      <DialogActions>
                        <Button onClick={() => setOpen(false)}>
                          No, volver
                        </Button>
                        <Button
                          onClick={() => {
                            cancelAppointment(
                              appointment as IUpcomingAppointment,
                              cancelReason
                            ).then((success) => {
                              if (success)
                                sendNotification(
                                  {
                                    type: ReceiverTypes.User,
                                    id:
                                      session?.user._id === appointment.patient
                                        ? psychologistUserId!
                                        : appointment.patient,
                                  },
                                  `El ${role} ${session?.user.fullName} ha cancelado la cita que tenían para el día ` +
                                    format(
                                      new Date(appointment.date),
                                      "dd 'de' MMMM 'a las' hh:mm aa"
                                    ) +
                                    (cancelReason.length > 0
                                      ? `, con esta justificación: ${cancelReason}`
                                      : ""),
                                  true,
                                  session?.user.profilePicture
                                );
                            });
                            setOpen(false);
                          }}
                          color="error"
                        >
                          Sí, estoy seguro
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )}

                {/* {!appointment.isPaid && (
                  <CancelModal appointmentId={appointment._id} />
                )} */}

                {/* {appointment.checkinTimePsychologist &&
                  appointment.endTime <= Date.now() / 1000 &&
                  appointment.calification === 0 && (
                    <CalificationModal appointmentId={appointment._id} />
                  )} */}

                {/* {!appointment.checkinTimePsychologist &&
                  (appointment.endTime <= Date.now() / 1000 ||
                    Date.now() / 1000 <= appointment.startTime - 7200) &&
                  (appointment.state === "activa" ||
                    appointment.state === "psicólogo no asistió") && (
                    <NextLink
                      href={`/app/citas/reagendar/${appointment._id}`}
                      passHref
                      prefetch={false}
                    >
                      <Button size="small" color="secondary" fullWidth>
                        Reagendar cita
                      </Button>
                    </NextLink>
                  )} */}
              </Stack>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};
