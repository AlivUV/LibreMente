import { updateUserById } from "@/app/_database/daos/userDao";
import { formatDuration, intervalToDuration } from "date-fns";
import { es } from "date-fns/locale";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const userId = data.get("userId");
  const timeSpent = data.get("timeSpent");

  if (userId && timeSpent) {
    updateUserById(String(userId), {
      $inc: { totalTimeSpent: Number(timeSpent) },
    });
  }
  return new NextResponse();
}
