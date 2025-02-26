import { IDay } from "./IDay";
import { IPsychologist } from "../IPsychologist";

export interface ISchedule {
  psychologist: IPsychologist | string;
  days: IDay[];
}
