import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";
import UpcomingAppointment from "../models/UpcomingAppointment";
import { connect, serialize } from "../connection";
import mongoose from "mongoose";
import { unstable_noStore as noStore } from "next/cache";

console.log("Entro al DAO de citas");

export async function getUpcomingAppointmentsByPsychologist(
  psychologist: string
) {
  noStore();
  await connect();
  console.log("Trayendo appointments desde el DAO");
  const appointments = await UpcomingAppointment.find({
    psychologist: psychologist,
  })
    .sort({ date: 1 })
    .lean();
  // console.log("Ejemplo");
  // console.log(appointments[0])
  console.log(
    "Encontrados " + appointments + " appointments. Saliendo del DAO..."
  );
  return serialize(appointments) as IUpcomingAppointment[];
}

export async function getUpcomingAppointmentsByPatient(patient: string) {
  noStore();
  await connect();
  console.log("Trayendo appointments desde el DAO");
  const appointments = await UpcomingAppointment.find({
    patient: patient,
  })
    .sort({ date: 1 })
    .lean();
  // console.log("Ejemplo");
  // console.log(appointments[0])
  console.log(
    "Encontrados " + appointments + " appointments. Saliendo del DAO..."
  );
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
  console.log("La cita insertada es");
  console.log(result);
  // return serialize(
  //   await getUpcomingAppointmentsByPsychologist(
  //     upcomingAppointment.psychologist
  //   )
  // );
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
  console.log("Se actualizaron", result.modifiedCount, "citas");
  return Boolean(result.modifiedCount);
}

export async function deleteUpcomingAppointmentById(id: string) {
  noStore();
  await connect();
  console.log("Borrando la cita: " + id);
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
  console.log("Hay " + appointments.length + " citas atrasadas");
  return serialize(appointments) as IUpcomingAppointment[];
}
