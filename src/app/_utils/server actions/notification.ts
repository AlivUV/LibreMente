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
import { NotificationTypes } from "@/app/_enums/NotificationTypes";
import { sendEmail } from "../email";
import { EmailDraftTypes } from "@/app/_enums/EmailDraftTypes";
import { getUserById } from "@/app/_database/daos/userDao";
import IUser from "@/app/_interfaces/IUser";
import Hour from "../hour";

interface INotificationInfo {
  patient?: IUser;
  psychologist?: IUser;
  appointment?: {
    date: Date;
  };
}

function createEmailDraft(type: string, notificationInfo?: INotificationInfo) {
  let subject, message;

  switch (type) {
    case EmailDraftTypes.NewAppointmentPsychologist:
      subject = "LibreMente cita programada";
      message = `El ${notificationInfo!.patient!.role.toLowerCase()} ${
        notificationInfo!.patient!.fullName
      } ha programado una cita para el día ${notificationInfo!.appointment!.date.getDate()}/${
        notificationInfo!.appointment!.date.getMonth() + 1
      }/${notificationInfo!.appointment!.date.getFullYear()} a las ${new Hour(
        notificationInfo!.appointment!.date.getHours()
      ).getString()}`;
      break;
    case EmailDraftTypes.NewAppointmentPatient:
      subject = "LibreMente cita programada";
      message = `Programaste una cita con el ${notificationInfo!.psychologist!.role.toLowerCase()} ${
        notificationInfo!.psychologist!.fullName
      } el día ${notificationInfo!.appointment!.date.getDate()}/${
        notificationInfo!.appointment!.date.getMonth() + 1
      }/${notificationInfo!.appointment!.date.getFullYear()} a las ${new Hour(
        notificationInfo!.appointment!.date.getHours()
      ).getString()}`;
      break;
  }

  return [subject, message];
}

export async function sendEmailNotification(
  patientInfo: IUser,
  psychologistId: string,
  notificationInfo?: INotificationInfo
) {
  const psychologistInfo = await getUserById(psychologistId);

  let [subject, message] = createEmailDraft(
    EmailDraftTypes.NewAppointmentPatient,
    {
      ...notificationInfo,
      patient: patientInfo,
      psychologist: psychologistInfo,
    }
  );

  sendEmail(patientInfo.email!, subject!, message!);

  [subject, message] = createEmailDraft(
    EmailDraftTypes.NewAppointmentPsychologist,
    {
      ...notificationInfo,
      patient: patientInfo,
      psychologist: psychologistInfo,
    }
  );

  sendEmail(psychologistInfo.email!, subject!, message!);
}


export async function sendNotification(
  receiver: INotification["receiver"],
  body: string,
  simpleClear: boolean,
  image?: string,
  condition?: INotification["condition"]
) {
  const notification: INotification = {
    image,
    body,
    receiver,
    simpleClear,
    condition,
  };
  const dbNotification = await createNotification(notification);
  pusherServer.trigger(receiver.id, "event", dbNotification);
  return Boolean(dbNotification);
}

export async function fetchNotificationsByUser(user: string, role: Roles) {
  const notifications = await getNotificationsByUser(user, role);
  const results = await Promise.all(notifications.map(notificationChecker));
  const checkedNotifications = notifications.filter(
    (_v, index) => results[index]
  );
  return checkedNotifications;
}

export async function clearNotificationById(id: string) {
  return await deleteNotificationById(id);
}

export async function getNotificationLink(notification: INotification) {
  if (!notification) {
    return "";
  }

  switch (notification.condition?.notificationType) {
    case NotificationTypes.Request:
      return "/solicitudes";
    case NotificationTypes.Appointment:
      return "/citas";
    default:
      return "";
  }
}