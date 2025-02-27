import { getFile } from "@/app/_utils/google-drive";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { fileId: string } },
) {
  const driveResponse = await getFile(params.fileId);
  return new NextResponse(driveResponse, { status: 200, statusText: "OK" });
}
