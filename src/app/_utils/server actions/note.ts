"use server";
import {
  createNote,
  getFilteredNotes,
  getNoteById,
  getNotesByAppointment,
  getNotesByDate,
  getNotesByPatient,
  getNotesByTitle,
  updateNote,
} from "@/app/_database/daos/noteDao";
import NoteFilters from "@/app/_enums/NoteFilters";
import { INote } from "@/app/_interfaces/INote";

export async function fetchNotesByPatient(
  psychologist: string,
  patient: string
) {
  const notes = await getNotesByPatient(psychologist, patient);
  return notes;
}

export async function fetchNotesByAppointment(appointment: string) {
  const notes = await getNotesByAppointment(appointment);
  return notes;
}

export async function fetchNoteById(id: string) {
  const note = await getNoteById(id);
  return note;
}

export async function saveNote(note: INote) {
  if (note._id) {
    return await updateNote(note);
  } else {
    return await createNote(note);
  }
}

export async function filterNotes(
  psychologist: string,
  filter: string | Date,
  filterBy: NoteFilters,
  patient?: string
) {
  let patientName;
  let title;
  let date;
  switch (filterBy) {
    case NoteFilters.Title:
      // notes = (filter as string).length === 0 ?
      //     await getNotesByPatient(psychologist, patient) :
      //     await getNotesByTitle(psychologist, patient, filter as string);
      // break;
      title = filter as string;
      break;
    case NoteFilters.Date:
      // notes = await getNotesByDate(psychologist, patient, filter as Date);
      // break;
      date = filter as Date;
      break;
    case NoteFilters.Patient:
      patientName = filter as string;
      break;
  }
  const notes = await getFilteredNotes(
    psychologist,
    patient,
    patientName,
    title,
    date
  );
  return notes;
}
