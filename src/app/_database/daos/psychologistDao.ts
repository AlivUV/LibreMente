import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import Psychologist from "../models/Psychologist";
import { connect, serialize } from "../connection";
import { unstable_noStore as noStore } from "next/cache";
import { getPsychologistsByTutorPipeline } from "../aggregation pipelines/psychologist";
import { UserStates } from "@/app/_enums/UserStates";

export async function getPsychologists(activeOnly = false) {
  noStore();
  await connect();
  const psychologists = await Psychologist.find({
    state: activeOnly ? UserStates.Activo : { $nin: [] },
  }).lean();
  return serialize(psychologists) as IPsychologist[];
}

export async function getPsychologistsByTutor(
  tutorId: string,
  activeOnly = false
) {
  noStore();
  await connect();
  const psychologists = await Psychologist.aggregate(
    getPsychologistsByTutorPipeline(tutorId, activeOnly)
  );
  return serialize(psychologists) as IPsychologist[];
}

export async function getPsychologistBySlug(slug: string) {
  noStore();
  await connect();
  const psychologist = await Psychologist.findOne({ slug: slug }).lean();
  return serialize(psychologist) as IPsychologist;
}

export async function getPsychologistById(id: string) {
  noStore();
  await connect();
  const psychologist = await Psychologist.findById(id).lean();
  return serialize(psychologist) as IPsychologist;
}

export async function getPsychologistByUser(user: string) {
  noStore();
  await connect();
  const psychologist = await Psychologist.findOne({ user: user }).lean();
  console.log("Psicólogo:");
  console.log(psychologist);
  return serialize(psychologist) as IPsychologist;
}

export async function updatePsychologistByUser(
  user: string,
  psychologist: Partial<IPsychologist>
) {
  noStore();
  await connect();
  const result = await Psychologist.updateOne({ user: user }, psychologist);
  return Boolean(result.modifiedCount);
}

export async function createPsychologist(psychologist: IPsychologist) {
  noStore();
  await connect();
  const result = await Psychologist.create(psychologist);
  return Boolean(result);
}
