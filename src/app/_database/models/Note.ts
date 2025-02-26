import { INote } from "@/app/_interfaces/INote";
import mongoose, { Model, Schema, model } from "mongoose";

const noteSchema = new Schema<INote>(
  {
    title: String,
    content: String,
    appointment: Schema.Types.ObjectId,
    patient: Schema.Types.ObjectId,
    psychologist: Schema.Types.ObjectId,
    patientName: String,
  },
  { timestamps: true },
);

const Note: Model<INote> = mongoose.models.Note || model("Note", noteSchema);

export default Note;
