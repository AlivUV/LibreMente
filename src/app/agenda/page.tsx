import { IDay } from "@/app/_interfaces/schedule/IDay";
import ScheduleDisplay from "../_components/schedule/ScheduleDisplay";
import { Metadata } from "next";
// console.log("Hours es: " + hours);

export const metadata: Metadata = {
  title: "Agenda",
};

export default function ConfigureSchedulePage() {
  return <ScheduleDisplay />;
}
