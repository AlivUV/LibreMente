import { ISchedule } from "@/app/_interfaces/schedule/ISchedule";
import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";
import { IDay } from "@/app/_interfaces/schedule/IDay";
import { isEqual } from "date-fns";
import { getColombianHour } from "./hour";

function isDay(this: Date, day: IDay) {
  return day.day === getEsDay(this);
}

export function getEsDay(date: Date) {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  return days[date.getDay()];
}

export function getAvailableHours(
  date: Date,
  appointments: IUpcomingAppointment[],
  schedule: ISchedule,
  test?: boolean,
) {
  const hours: boolean[] = [];
  schedule.days[schedule.days.findIndex(isDay, date)].hours.map((hour) =>
    hours.push(hour),
  );
  appointments.map((appointment) => {
    if (isSameDay(appointment.date, date)) {
      hours[new Date(appointment.date).getHours()] = false;
    }
  });
  if (isSameDay(date, new Date())) {
    hours.fill(false, 0, getColombianHour());
  }

  return hours;
}

export function isDayAvailable(
  date: Date,
  appointments: IUpcomingAppointment[],
  schedule: ISchedule,
) {
  const hours = getAvailableHours(date, appointments, schedule, true);
  for (let i = 0; i < hours.length; i++) {
    if (hours[i]) return true;
  }
  return false;
}

export function isAppointmentTime(appointmentDate: Date) {
  const date1 = new Date(appointmentDate);
  const date2 = new Date();
  date2.setMinutes(0, 0, 0);
  return isEqual(date1, date2);
}

export function isSameDay(date1: Date, date2: Date) {
  return isEqual(
    new Date(date1).setHours(0, 0, 0, 0),
    new Date(date2).setHours(0, 0, 0, 0),
  );
}
