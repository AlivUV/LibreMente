import { IDay } from "@/app/_interfaces/schedule/IDay";
import { Schema } from "mongoose";

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
