import { UserStates } from "../_enums/UserStates";
import IUser from "./IUser";

export interface IPsychologist {
  _id?: string;
  fullName: string;
  gender: string;
  user: string;
  profilePicture: string;
  slug: string;
  bio?: string;
  calification?: number;
  specialties?: string[];
  services?: string[];
  isPublic: boolean;
  state: UserStates;

  createAt?: string;
  updatedAt?: string;
}
