import { IPreviousAppointment } from "./IPreviousAppointment";
import { IPsychologist } from "./IPsychologist";
import IUser from "./IUser";

export interface INote {
  _id?: string;
  title: string;
  content: string;
  appointment?: string;
  psychologist: string;
  patient: string;
  patientName: string;
  createdAt?: Date;
}
