import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";
import UpcomingAppointment from "../models/UpcomingAppointment";
import { connect, serialize } from "../connection";
import mongoose from "mongoose";
import { unstable_noStore as noStore } from "next/cache";

export async function getUpcomingAppointmentsByPsychologist(
  psychologist: string
) {
  noStore();
  await connect();
  const appointments = await UpcomingAppointment.find({
    psychologist: psychologist,
  })
    .sort({ date: 1 })
    .lean();
  return serialize(appointments) as IUpcomingAppointment[];
}

export async function getUpcomingAppointmentsByPatient(patient: string) {
  noStore();
  await connect();
  const appointments = await UpcomingAppointment.find({
    patient: patient,
  })
    .sort({ date: 1 })
    .lean();
  return serialize(appointments) as IUpcomingAppointment[];
}

export async function getUpcomingAppointmentById(id: string) {
  noStore();
  await connect();
  const appointment = await UpcomingAppointment.findById(id).lean();
  return serialize(appointment) as IUpcomingAppointment;
}

export async function createUpcomingAppointment(
  upcomingAppointment: IUpcomingAppointment
) {
  noStore();
  await connect();
  const result = await UpcomingAppointment.create(upcomingAppointment);
  return serialize(result) as IUpcomingAppointment;
}

export async function updateUpcomingAppointment(
  appointment: Partial<IUpcomingAppointment>
) {
  noStore();
  await connect();
  const result = await UpcomingAppointment.updateOne(
    { _id: new mongoose.Types.ObjectId(appointment._id) },
    appointment
  );
  return Boolean(result.modifiedCount);
}

export async function deleteUpcomingAppointmentById(id: string) {
  noStore();
  await connect();
  const result = await UpcomingAppointment.deleteOne({ _id: id });
  return result.deletedCount > 0;
}

export async function getOverdueUpcomingAppointments() {
  noStore();
  await connect();
  const date = new Date();
  date.setMinutes(0, 0, 0);
  const appointments = await UpcomingAppointment.find({
    date: { $lt: date },
  })
    .sort({ date: 1 })
    .lean();
  return serialize(appointments) as IUpcomingAppointment[];
}
