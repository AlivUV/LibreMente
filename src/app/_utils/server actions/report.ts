"use server";

import {
  filterAppointmentsByPsychologist,
  filterYearlyActivePatients,
} from "@/app/_database/daos/previousAppointmentDao";
import { filterUsersByRole } from "@/app/_database/daos/userDao";
import PatientFilters from "@/app/_enums/reports/PatientFilters";
import PsychologistFilters from "@/app/_enums/reports/PsychologistFilters";
import Roles from "@/app/_enums/Roles";

export async function countYearlyActivePatients(
  filter: PatientFilters,
  year: number,
) {
  const results = await filterYearlyActivePatients(filter, year);
  return results;
}

export async function countUsersByRole(
  filter: PsychologistFilters,
  role: Roles,
) {
  const results = await filterUsersByRole(filter, role);
  return results;
}

export async function countAppointmentsByPsychologist(
  filter: PatientFilters,
  psychologist?: string,
) {
  const results = await filterAppointmentsByPsychologist(filter, psychologist);
  return results;
}
