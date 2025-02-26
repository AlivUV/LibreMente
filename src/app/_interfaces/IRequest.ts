import { RequestStates } from "../_enums/RequestStates";
import Roles from "../_enums/Roles";

export interface IRequest {
  _id?: string;
  user: string;
  lastName: string;
  firstName: string;
  requestedRole: Roles;
  supportingDocumentId: string;
  createdAt?: Date;
  comment?: string;
  state: RequestStates;
}
