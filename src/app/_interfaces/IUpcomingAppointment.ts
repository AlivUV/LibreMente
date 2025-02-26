export interface IUpcomingAppointment {
  _id?: string;
  patient: string;
  psychologist: string;
  date: Date;
  roomName: string;
  roomURL: string;
  calification?: number;
  calificationComment?: string;
}
