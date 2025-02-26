import mongoose, { Schema, model, Model } from "mongoose";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { UserStates } from "@/app/_enums/UserStates";

const psychologistSchema = new Schema<IPsychologist>(
  {
    user: Schema.Types.ObjectId,
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    slug: { type: String, required: true },
    bio: { type: String, default: "" },
    calification: {
      type: Number,
      default: 0,
    },
    specialties: [{ type: String }],
    services: [{ type: String }],
    isPublic: {
      type: Boolean,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: Object.values(UserStates),
      required: true,
      default: UserStates.Activo,
    },
  },
  { timestamps: true }
);

psychologistSchema.index({
  fullName: "text",
  gender: "text",
  specialties: "text",
});

const Psychologist: Model<IPsychologist> =
  mongoose.models.Psychologist || model("Psychologist", psychologistSchema);

export default Psychologist;
