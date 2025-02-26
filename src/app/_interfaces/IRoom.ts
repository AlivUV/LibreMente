import { IProperties } from "@/app/_classes/RoomProperties";

export interface IRoom {
  id: string;
  name: string;
  url: string;
  config: IProperties;
}
