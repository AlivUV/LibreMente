import Roles from "../_enums/Roles";
import { UserStates } from "../_enums/UserStates";

export default interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password?: string;
  role: Roles;
  phone?: string;
  profilePicture?: string;
  accept?: boolean;
  state: UserStates;
  gender?: string;
  supportingDocumentId?: string;
  createdAt?: string;
  updatedAt?: string;
  dateOfBirth?: Date;
  career?: string;
  semester?: number;
  age?: number;
  responsibleUser?: string;
  totalTimeSpent: number;
}
