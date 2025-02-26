"use server";
import {
  createNotification,
  deleteNotificationById,
  getNotificationsByUser,
} from "@/app/_database/daos/notificationDao";
import Roles from "@/app/_enums/Roles";
import { INotification } from "@/app/_interfaces/INotification";
import { pusherServer } from "@/app/_lib/pusher";
import { notificationChecker } from "../notifications";

export async function sendNotification(
  receiver: INotification["receiver"],
  body: string,
  simpleClear: boolean,
  image?: string,
  condition?: INotification["condition"],
) {
  const notification: INotification = {
    image,
    body,
    receiver,
    simpleClear,
    condition,
  };
  const dbNotification = await createNotification(notification);
  console.log("Hago el trigger");
  pusherServer.trigger(receiver.id, "event", dbNotification);
  return Boolean(dbNotification);
}

export async function fetchNotificationsByUser(user: string, role: Roles) {
  console.log("Fetcheando las notificaciones de un usuario con rol: ", role);
  const notifications = await getNotificationsByUser(user, role);
  const results = await Promise.all(notifications.map(notificationChecker));
  const checkedNotifications = notifications.filter(
    (_v, index) => results[index],
  );
  console.log("Resultados filtro", checkedNotifications.length);
  return checkedNotifications;
}

export async function clearNotificationById(id: string) {
  return await deleteNotificationById(id);
}
