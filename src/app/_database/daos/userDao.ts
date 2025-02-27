import IUser from "@/app/_interfaces/IUser";
import { connect, serialize } from "../connection";
import User from "../models/User";
import {
  addAgePipeline,
  filterUsersByRolePipeline,
  getPatientsByPsychologistPipeline,
} from "../aggregation pipelines/user";
import mongoose, { Aggregate } from "mongoose";
import PsychologistFilters from "@/app/_enums/reports/PsychologistFilters";
import Roles from "@/app/_enums/Roles";
import { IReportResult } from "@/app/_interfaces/IReportResult";
import { unstable_noStore as noStore } from "next/cache";
import { UserStates } from "@/app/_enums/UserStates";

export async function getUsers(activeOnly = false) {
  noStore();
  await connect();
  const users = await User.find({
    state: activeOnly ? UserStates.Activo : { $nin: [] },
  }).lean();
  return serialize(users) as IUser[];
}

export async function getUserById(id: string) {
  noStore();
  await connect();
  console.log(id);
  const user: IUser[] = await User.aggregate(addAgePipeline).match({
    _id: new mongoose.Types.ObjectId(id),
  });
  return user[0];
}

export async function getUserByEmail(email: string) {
  noStore();
  await connect();
  const user: IUser[] = await User.aggregate(addAgePipeline).match({ email });
  console.log(user[0]);
  return user[0];
}

export async function getAssignedUsersById(id: string, activeOnly = false) {
  noStore();
  await connect();
  const users = await User.find({
    responsibleUser: new mongoose.Types.ObjectId(id),
    state: activeOnly ? UserStates.Activo : { $nin: [] },
  }).lean();
  return serialize(users) as IUser[];
}

export async function updateUserByEmail(email: string, user: Partial<IUser>) {
  noStore();
  await connect();
  const result = await User.updateOne({ email: email }, user);
  return Boolean(result.modifiedCount);
}

export async function updateUserById(
  id: string,
  user: mongoose.UpdateQuery<IUser>
) {
  noStore();
  await connect();
  console.log(user);
  const result = await User.updateOne({ _id: id }, user);
  return Boolean(result.modifiedCount);
}

export async function createUser(user: IUser) {
  noStore();
  await connect();
  const result = await User.create(user);
  return Boolean(result);
}

export async function getUpdatedUserByEmail(email: string, user: IUser) {
  noStore();
  await connect();
  await updateUserByEmail(email, user);
  const updatedUser = await getUserByEmail(email);
  return updatedUser;
}

export async function filterUsersByRole(
  filter: PsychologistFilters,
  role: Roles,
  activeOnly = false
) {
  noStore();
  await connect();
  const results: IReportResult[] = await User.aggregate(
    filterUsersByRolePipeline(filter, role, activeOnly)
  );
  return results;
}

export async function getPatientsByPsychologist(
  psychologist: string,
  activeOnly = false
) {
  noStore();
  console.log("el psicólogo es:", psychologist);
  const users: IUser[] = await User.aggregate(
    getPatientsByPsychologistPipeline(psychologist, activeOnly)
  );
  console.log(`Resultado: ${users}`);
  return users;
}
