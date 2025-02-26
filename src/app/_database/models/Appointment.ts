import mongoose, { Schema, model, Model } from "mongoose";
import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";

const appointmentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    psychologist: {
      type: Schema.Types.ObjectId,
      ref: "Psychologist",
      required: true,
    },
    typeService: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: {
        values: [
          "solicitada",
          "activa",
          "cancelada",
          "finalizada",
          "consultante no asistió",
          "psicólogo no asistió",
        ],
        message: "{VALUES} no es un estado válido",
        default: "solicitada",
        required: true,
      },
    },
    date: {
      type: String,
      required: true,
    },
    checkinTimePatient: {
      type: Number,
      trim: true,
    },
    checkinTimePsychologist: {
      type: Number,
      trim: true,
    },
    calification: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    calificationComment: {
      type: String,
      trim: true,
    },
    cancelReason: {
      type: String,
      trim: true,
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],

    paymentResult: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: String,
      trim: true,
    },

    transactionId: {
      type: String,
      trim: true,
    },

    dailyUrl: {
      type: String,
      trim: true,
    },
    dailyRoomId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Appointment: Model<IPreviousAppointment> =
  mongoose.models.Appointment || model("Appointment", appointmentSchema);

export default Appointment;
