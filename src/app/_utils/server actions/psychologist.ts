"use server";

import { getPsychologists } from "@/app/_database/daos/psychologistDao";

export default async function fetchPsychologists(activeOnly = false) {
  const psychologists = await getPsychologists(activeOnly);
  return psychologists;
}
