import { IDay } from "@/app/_interfaces/schedule/IDay";
import { ISchedule } from "@/app/_interfaces/schedule/ISchedule";
import mongoose, { Model, Schema, model } from "mongoose";

const daySchema = new Schema<IDay>({
  day: {
    type: String,
    enum: {
      values: [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ],
    },
    required: true,
  },
  hours: [Boolean],
});

const scheduleSchema = new Schema<ISchedule>({
  psychologist: { type: Schema.Types.ObjectId, required: true },
  days: [daySchema],
});

const Schedule: Model<ISchedule> =
  mongoose.models.Schedule || model("Schedule", scheduleSchema);

export default Schedule;
