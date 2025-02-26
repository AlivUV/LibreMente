import { updateUserById } from "@/app/_database/daos/userDao";
import { formatDuration, intervalToDuration } from "date-fns";
import { es } from "date-fns/locale";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  console.log("Hola, me llegó esto desde el cliente:");
  console.log(data);
  const userId = data.get("userId");
  const timeSpent = data.get("timeSpent");

  if (userId && timeSpent) {
    console.log(
      `La sesión duró ${formatDuration(
        intervalToDuration({ start: 0, end: Number(timeSpent) }),
        { locale: es },
      )}`,
    );
    updateUserById(String(userId), {
      $inc: { totalTimeSpent: Number(timeSpent) },
    });
  }
  return new NextResponse();
}
