import { RequestStates } from "@/app/_enums/RequestStates";
import Roles from "@/app/_enums/Roles";
import { IRequest } from "@/app/_interfaces/IRequest";
import mongoose, { Model, Schema, model } from "mongoose";

const requestSchema = new Schema<IRequest>(
  {
    firstName: String,
    lastName: String,
    requestedRole: {
      type: String,
      enum: {
        values: [Roles.Practicante, Roles.Tutor, Roles.Monitor],
        message: "{VALUES} no es un role válido",
        default: Roles.Practicante,
      },
    },
    user: Schema.Types.ObjectId,
    supportingDocumentId: String,
    state: {
      type: String,
      enum: {
        values: Object.values(RequestStates),
        default: RequestStates.Pendiente,
      },
    },
    comment: String,
  },
  { timestamps: true }
);

const Request: Model<IRequest> =
  mongoose.models.Request || model("Request", requestSchema);

export default Request;
