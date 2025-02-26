import { IDay } from "@/app/_interfaces/schedule/IDay";
import Hour from "./hour";

export const days: IDay["day"][] = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const hours: Hour[] = Array.from({ length: 24 }, (v, i) => new Hour(i));

export const dailyHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
};
