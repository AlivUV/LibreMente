import { IDay } from "@/app/_interfaces/schedule/IDay";
import { connect, serialize } from "../connection";
import Schedule from "../models/Schedule";
import { ISchedule } from "@/app/_interfaces/schedule/ISchedule";
import { unstable_noStore as noStore } from "next/cache";

export async function getScheduleByPsychologist(psychologist: string) {
  noStore();
  await connect();
  const schedule = await Schedule.findOne({
    psychologist: psychologist,
  }).lean();
  return serialize(schedule) as ISchedule;
}

export async function updateScheduleByPsychologist(
  psychologist: string,
  schedule: IDay[]
) {
  noStore();
  await connect();
  await Schedule.updateOne(
    { psychologist: psychologist },
    { days: schedule },
    { upsert: true }
  );
}

export async function getScheduleById(id: string) {
  noStore();
  await connect();
  const schedule = await Schedule.findOne({ psychologist: id }).lean();
  return serialize(schedule) as ISchedule;
}
