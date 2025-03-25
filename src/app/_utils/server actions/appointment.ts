"use server";
import {
  createPreviousAppointment,
  updatePreviousAppointment,
} from "@/app/_database/daos/previousAppointmentDao";
import { createRoom, deleteRoom } from "@/app/_database/daos/roomDao";
import {
  createUpcomingAppointment,
  deleteUpcomingAppointmentById,
  getOverdueUpcomingAppointments,
  getUpcomingAppointmentById,
  getUpcomingAppointmentsByPsychologist,
  updateUpcomingAppointment,
} from "@/app/_database/daos/upcomingAppointmentDao";
import { PreviousAppointmentStates } from "@/app/_enums/PreviousAppointmentStates";
import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";

export async function scheduleAppointment(
  user: string,
  psychologist: string,
  date: Date
) {
  const nbf = date.getTime() / 1000;
  const exp = new Date(date).setHours(date.getHours() + 1) / 1000;
  const room = await createRoom(nbf, exp);
  const appointment: IUpcomingAppointment = {
    patient: user,
    psychologist: psychologist,
    date: date,
    roomName: room?.name!,
    roomURL: room?.url!,
  };
  const newAppointment = await createUpcomingAppointment(appointment);
  return newAppointment;
}

export async function moveAppointment(
  upcomingAppointment: IUpcomingAppointment
) {
  const previousAppointment: IPreviousAppointment = {
    _id: upcomingAppointment._id,
    date: upcomingAppointment.date,
    patient: upcomingAppointment.patient,
    psychologist: upcomingAppointment.psychologist,
    calification: upcomingAppointment.calification,
    calificationComment: upcomingAppointment.calificationComment,
  };
  const result1 = await createPreviousAppointment(previousAppointment);
  const result2 = await deleteUpcomingAppointmentById(upcomingAppointment._id!);
  return result1 && result2;
}

export async function compareDates() {
  const appointments = await getOverdueUpcomingAppointments();
  await Promise.all(
    appointments.map(async (appointment) => await moveAppointment(appointment))
  );
  return appointments.length;
}

export async function cancelAppointment(
  upcomingAppointment: IUpcomingAppointment,
  cancelReason?: string,
) {
  const previousAppointment: IPreviousAppointment = {
    _id: upcomingAppointment._id,
    date: upcomingAppointment.date,
    patient: upcomingAppointment.patient,
    psychologist: upcomingAppointment.psychologist,
    cancelReason,
    state: PreviousAppointmentStates.Cancelled,
  };
  const result = await deleteUpcomingAppointmentById(upcomingAppointment._id!)
    .then(() => deleteRoom(upcomingAppointment.roomName))
    .then(() => createPreviousAppointment(previousAppointment));
  return result;
}

export async function rateAppointment(
  appointmentId: string,
  calification: number,
  calificationComment?: string,
) {
  let result = await updateUpcomingAppointment({
    _id: appointmentId,
    calification,
    calificationComment,
  });
  return result
    ? result
    : updatePreviousAppointment({
        _id: appointmentId,
        calification,
        calificationComment,
      });
}
