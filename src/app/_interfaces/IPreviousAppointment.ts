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
