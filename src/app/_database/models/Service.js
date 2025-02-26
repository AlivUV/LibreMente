import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    name: { type: String, required: true },
    cost: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: {
        values: ["activo", "inactivo"],
        message: "{VALUES} no es un estado válido",
        default: "activo",
        required: true,
      },
    },
    currency: { type: String, required: true },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
export const currentModels = Service.db.name;
