import { INote } from "@/app/_interfaces/INote";
import Note from "../models/Note";
import { connect, serialize } from "../connection";
import { FilterQuery, Types } from "mongoose";
import { unstable_noStore as noStore } from "next/cache";

export async function getNotesByPatient(psychologist: string, patient: string) {
  noStore();
  await connect();
  const notes = await Note.find({
    psychologist: new Types.ObjectId(psychologist),
    patient: new Types.ObjectId(patient),
  }).lean();
  return serialize(notes) as INote[];
}

export async function createNote(note: INote) {
  noStore();
  await connect();
  const result = await Note.create(note);
  return result ? true : false;
}

export async function getFilteredNotes(
  psychologist: string,
  patient?: string,
  patientName?: string,
  title?: string,
  date?: Date
) {
  noStore();
  await connect();
  let dateExp: any = date;
  if (date) {
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);
    dateExp = { $gte: dayStart, $lt: dayEnd };
  }
  const prueba: FilterQuery<INote> = {
    psychologist,
    patient,
    title: title ? { $regex: new RegExp(title, "i") } : title,
    patientName: patientName
      ? { $regex: new RegExp(patientName, "i") }
      : patientName,
    createdAt: dateExp,
  };
  for (let key in prueba) {
    if (!prueba[key]) {
      delete prueba[key];
    }
  }
  const sortBy = patientName ? "patientName" : date ? "date" : "title";
  const notes = await Note.find(prueba).sort(sortBy);
  return serialize(notes) as INote[];
}

export async function getNotesByTitle(
  psychologist: string,
  patient: string,
  title: string
) {
  noStore();
  await connect();
  const notes = await Note.find({
    psychologist: psychologist,
    patient: patient,
    title: { $regex: new RegExp(title, "i") },
  }).lean();
  return serialize(notes) as INote[];
}

export async function getNotesByDate(
  psychologist: string,
  patient: string,
  date: Date
) {
  noStore();
  await connect();
  const dayStart = new Date(date);
  const dayEnd = new Date(date);
  dayEnd.setDate(dayEnd.getDate() + 1);
  const notes = await Note.find({
    psychologist: psychologist,
    patient: patient,
    createdAt: { $gte: dayStart, $lt: dayEnd },
  }).lean();
  return serialize(notes) as INote[];
}

export async function getNotesByAppointment(appointment: string) {
  noStore();
  await connect();
  const notes = await Note.find({ appointment: appointment }).lean();
  return serialize(notes) as INote[];
}

export async function updateNote(note: Partial<INote>) {
  noStore();
  await connect();
  const result = await Note.updateOne({ _id: note._id }, note);
  return Boolean(result.modifiedCount);
}

export async function getNoteById(id: string) {
  noStore();
  await connect();
  const note = await Note.findById(id).lean();
  return serialize(note) as INote;
}
