import { Schema } from "mongoose";
import Roles from "../_enums/Roles";
import { ReceiverTypes } from "../_enums/ReceiverTypes";
import { NotificationTypes } from "../_enums/NotificationTypes";

export interface INotification {
  _id?: string;
  image?: string;
  receiver: {
    type: ReceiverTypes;
    id: string;
  };
  body: string;
  createdAt?: Date;
  simpleClear: boolean;
  condition?: {
    notificationType: NotificationTypes;
    clues: string[];
  };
}

export function isNotification(object: any): object is INotification {
  return "body" in object;
}
