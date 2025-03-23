"use server";

import { updatePsychologistByUser } from "@/app/_database/daos/psychologistDao";
import {
  createUser,
  getAssignedUsersById,
  getUserById,
  updateUserById,
} from "@/app/_database/daos/userDao";
import { hashPass } from "@/app/_encryption/userPass";
import Roles from "@/app/_enums/Roles";
import { UserStates } from "@/app/_enums/UserStates";
import IUser from "@/app/_interfaces/IUser";
import { validateRegisterData } from "@/app/_validations/user";
import { UpdateQuery } from "mongoose";
import { uploadPhoto } from "../google-drive";

export async function getImageLink(formData: FormData) {
  const image = formData.get("file") as File;
  const bytes: ArrayBuffer = await image.arrayBuffer();
  const buffer: Buffer = Buffer.from(bytes);

  const imageId = await uploadPhoto(buffer, image.name);

  const link = `https://lh3.googleusercontent.com/d/${imageId}`;

  return link;
}

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  profilePicture,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture?: string;
}) {
  {
    const validationStatus = validateRegisterData(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    if (validationStatus.status === 400) {
      return validationStatus;
    }
  }

  password = await hashPass(password);

  const userData: IUser = {
    firstName: firstName,
    lastName: lastName,
    fullName: `${firstName} ${lastName}`,
    email: email,
    password: password,
    role: Roles.Consultante,
    state: UserStates.Activo,
    totalTimeSpent: 0,
  };

  if (profilePicture) {
    userData.profilePicture = profilePicture;
  }

  const newUser = await createUser(userData);
  return newUser;
}

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
