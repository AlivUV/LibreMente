import { INote } from "./INote";
// import { IUser } from "./user";
import IUser from "./IUser";

export interface IPreviousAppointment {
  _id?: string;
  patient: string;
  psychologist: string;
  state?: string;
  date: Date;
  calification?: number;
  calificationComment?: string;
  cancelReason?: string;
}
