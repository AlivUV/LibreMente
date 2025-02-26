import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import PreviousAppointment from "../models/PreviousAppointment";
import { connect, serialize } from "../connection";
import {
  filterAppointmentsByPsychologistPipeline,
  filterYearlyActivePatientsPipeline,
} from "../aggregation pipelines/previousAppointment";
import PatientFilters from "@/app/_enums/reports/PatientFilters";
import { IReportResult } from "@/app/_interfaces/IReportResult";
import mongoose from "mongoose";
import { unstable_noStore as noStore } from "next/cache";

export async function getPreviousAppointmentsByPsychologist(
  psychologist: string
) {
  noStore();
  await connect();
  const appointments = await PreviousAppointment.find({
    psychologist: psychologist,
  })
    .sort({ date: -1 })
    .lean();
  return serialize(appointments) as IPreviousAppointment[];
}

export async function getPreviousAppointmentsByPatient(patient: string) {
  noStore();
  await connect();
  const appointments = await PreviousAppointment.find({
    patient: patient,
  })
    .sort({ date: -1 })
    .lean();
  return serialize(appointments) as IPreviousAppointment[];
}

export async function getPreviousAppointmentsByPatientAndPsychologist(
  patient: string,
  psychologist: string
) {
  noStore();
  await connect();
  const appointments = await PreviousAppointment.find({
    patient,
    psychologist,
  })
    .sort({ date: -1 })
    .lean();
  return serialize(appointments) as IPreviousAppointment[];
}

export async function getPreviousAppointmentById(id: string) {
  noStore();
  await connect();
  const appointment = await PreviousAppointment.findById(id).lean();
  return serialize(appointment) as IPreviousAppointment;
}

export async function createPreviousAppointment(
  appointment: IPreviousAppointment
) {
  noStore();
  await connect();
  const result = await PreviousAppointment.create(appointment);
  return result ? true : false;
}

export async function updatePreviousAppointment(
  appointment: Partial<IPreviousAppointment>
) {
  noStore();
  await connect();
  const result = await PreviousAppointment.updateOne(
    { _id: new mongoose.Types.ObjectId(appointment._id) },
    appointment
  );
  console.log("Se actualizaron", result.modifiedCount, "citas");
  return Boolean(result.modifiedCount);
}

export async function filterYearlyActivePatients(
  filter: PatientFilters,
  year: number
) {
  noStore();
  await connect();
  const results: IReportResult[] = await PreviousAppointment.aggregate(
    filterYearlyActivePatientsPipeline(filter, year)
  );
  return results;
}

export async function filterAppointmentsByPsychologist(
  filter: PatientFilters,
  psychologist?: string
) {
  noStore();
  await connect();
  const results: IReportResult[] = await PreviousAppointment.aggregate(
    filterAppointmentsByPsychologistPipeline(filter, psychologist)
  );
  return results;
}
