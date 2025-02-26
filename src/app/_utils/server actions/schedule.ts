"use server";

import { getScheduleByPsychologist } from "@/app/_database/daos/scheduleDao";

export async function fetchScheduleByPsychologist(psychologistId: string) {
  const schedule = await getScheduleByPsychologist(psychologistId);
  return schedule;
}
