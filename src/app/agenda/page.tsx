import ScheduleDisplay from "../_components/schedule/ScheduleDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda",
};

export default function ConfigureSchedulePage() {
  return <ScheduleDisplay />;
}
