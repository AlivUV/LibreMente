import { RoomProperties } from "@/app/_classes/RoomProperties";
import { IRoom } from "@/app/_interfaces/IRoom";
import { dailyHeaders } from "@/app/_utils/constants";
import { DAILY_API_URL } from "@/app/_utils/endpoints";
import { unstable_noStore as noStore } from "next/cache";

export async function createRoom(nbf: number, exp: number) {
  noStore();
  const roomProperties = new RoomProperties(nbf, exp);
  const response = await fetch(`${DAILY_API_URL}rooms`, {
    method: "POST",
    body: JSON.stringify(roomProperties),
    headers: dailyHeaders,
  });
  if (!response.ok) return null;
  const data: IRoom = await response.json();
  return data;
}

export async function deleteRoom(roomName: string) {
  noStore();
  const response = await fetch(`${DAILY_API_URL}rooms/${roomName}`, {
    method: "DELETE",
    headers: dailyHeaders,
  });
  console.log("Petición enviada a daily.co. Esta fue su respuesta: ");
  console.log(response);
  return response.ok;
}
