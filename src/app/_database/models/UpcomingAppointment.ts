import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";
import mongoose, { Model, Schema, model } from "mongoose";

const upcomingAppointmentSchema = new Schema<IUpcomingAppointment>({
  patient: Schema.Types.ObjectId,
  psychologist: Schema.Types.ObjectId,
  date: Date,
  roomName: String,
  roomURL: String,
  calification: Number,
  calificationComment: String,
});

const UpcomingAppointment: Model<IUpcomingAppointment> =
  mongoose.models.UpcomingAppointment ||
  model("UpcomingAppointment", upcomingAppointmentSchema);

export default UpcomingAppointment;
