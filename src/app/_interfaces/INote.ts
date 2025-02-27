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
