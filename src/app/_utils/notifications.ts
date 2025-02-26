import { deleteNotificationById } from "../_database/daos/notificationDao";
import { getRequestById } from "../_database/daos/requestDao";
import { NotificationTypes } from "../_enums/NotificationTypes";
import { RequestStates } from "../_enums/RequestStates";
import { INotification } from "../_interfaces/INotification";

export async function notificationChecker(notification: INotification) {
  let keep = true;
  if (!notification.simpleClear) {
    switch (notification.condition?.notificationType!) {
      case NotificationTypes.Request:
        const requestId = notification.condition?.clues[0]!;
        const request = await getRequestById(requestId);
        keep = request?.state! === RequestStates.Pendiente;
        break;
      default:
    }
    if (!keep) await deleteNotificationById(notification._id!);
  }
  return keep;
}
