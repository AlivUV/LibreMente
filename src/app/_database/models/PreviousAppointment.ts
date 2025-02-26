import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import mongoose, { Model, Schema, model } from "mongoose";

const previousAppointmentSchema = new Schema<IPreviousAppointment>({
  patient: Schema.Types.ObjectId,
  psychologist: Schema.Types.ObjectId,
  state: {
    type: String,
    enum: {
      values: [
        "Finalizada",
        "Cancelada",
        "Consultante no asistió",
        "Psicólogo no asistió",
      ],
    },
  },
  date: Date,
  calification: Number,
  calificationComment: String,
  cancelReason: String,
});

const PreviousAppointment: Model<IPreviousAppointment> =
  mongoose.models.PreviousAppointment ||
  model("PreviousAppointment", previousAppointmentSchema);

export default PreviousAppointment;
