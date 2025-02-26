"use server";

import { updatePsychologistByUser } from "@/app/_database/daos/psychologistDao";
import {
  getAssignedUsersById,
  getUserById,
  updateUserById,
} from "@/app/_database/daos/userDao";
import { UserStates } from "@/app/_enums/UserStates";
import IUser from "@/app/_interfaces/IUser";
import { UpdateQuery } from "mongoose";

export async function fetchUserById(id: string) {
  const user = await getUserById(id);
  return user;
}

export async function fetchAssignedUsersById(id: string, activeOnly = false) {
  const users = await getAssignedUsersById(id, activeOnly);
  return users;
}

export async function saveUserById(id: string, user: UpdateQuery<IUser>) {
  const result = await updateUserById(id, user);
  return result;
}

export async function saveUserStateById(
  id: string,
  state: UserStates,
  psychologist = false
) {
  let result = false;
  result = await updateUserById(id, { state });
  console.log("Psychologist es:" + psychologist);
  if (psychologist) {
    result = await updatePsychologistByUser(id, { state });
  }
  return result;
}
