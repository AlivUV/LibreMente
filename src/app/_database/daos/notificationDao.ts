import { INotification } from "@/app/_interfaces/INotification";
import Notification from "../models/Notification";
import { connect, serialize } from "../connection";
import Roles from "@/app/_enums/Roles";
import { FilterQuery } from "mongoose";
import { unstable_noStore as noStore } from "next/cache";

export async function getNotificationsByUser(user: string, role: Roles) {
  noStore();
  await connect();
  const query: FilterQuery<INotification> = {
    $or: [{ "receiver.id": user }, { "receiver.id": role }],
  };
  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .lean();
  return serialize(notifications) as INotification[];
}

export async function createNotification(notification: INotification) {
  noStore();
  await connect();
  const result = await Notification.create(notification);
  return serialize(result) as INotification;
}

export async function deleteNotificationById(id: string) {
  noStore();
  await connect();
  const result = await Notification.deleteOne({ _id: id });
  return Boolean(result.deletedCount);
}
