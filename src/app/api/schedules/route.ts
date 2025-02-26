import {
  getScheduleById,
  getScheduleByPsychologist,
  updateScheduleByPsychologist,
} from "@/app/_database/daos/scheduleDao";
import { IDay } from "@/app/_interfaces/schedule/IDay";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const id = searchParams.get("id");
  const psychologist = searchParams.get("psychologist");
  if (psychologist) {
    const schedule = await getScheduleByPsychologist(psychologist);
    return Response.json(schedule ? schedule : {});
  } else if (id) {
    const schedule = await getScheduleById(id);
    return Response.json(schedule ? schedule : {});
  }
  return Response.json({});
}

export async function POST(req: Request) {
  console.log("Llamando al post");
  const { psychologist, schedule }: { psychologist: string; schedule: IDay[] } =
    await req.json();
  await updateScheduleByPsychologist(psychologist, schedule);
  return Response.json({});
}
