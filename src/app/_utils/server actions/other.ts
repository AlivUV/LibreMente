"use server";
import { dailyHeaders } from "../constants";
import { DAILY_API_URL } from "../endpoints";

export async function requestToken(roomName: string) {
  const body = {
    properties: {
      room_name: roomName,
    },
  };
  const response = await fetch(`${DAILY_API_URL}meeting-tokens`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: dailyHeaders,
  });
  if (!response.ok) return "";
  const { token }: { token: string } = await response.json();
  return token;
}
