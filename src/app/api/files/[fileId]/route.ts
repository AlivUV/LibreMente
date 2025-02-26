import { getFile } from "@/app/_utils/google-drive";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { fileId: string } },
) {
  const driveResponse = await getFile(params.fileId);
  const blob = new Blob();
  // const reader = new FileReader();
  // let result;
  // reader.onload = (e) => {result = e.target?.result};
  // reader.readAsDataURL(driveResponse);
  return new NextResponse(driveResponse, { status: 200, statusText: "OK" });
}
