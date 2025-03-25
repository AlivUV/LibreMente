"use server";

import {
  createRequest,
  deleteRequest,
  getRequestsByUser,
  getRequestsByUserRole,
  updateRequest,
} from "@/app/_database/daos/requestDao";
import { getMyServerSession } from "../next-auth";
import { IRequest } from "@/app/_interfaces/IRequest";
import IUser from "@/app/_interfaces/IUser";
import { deleteFile, uploadFile } from "../google-drive";
import Roles from "@/app/_enums/Roles";
import { RequestStates } from "@/app/_enums/RequestStates";
import { updateUserById } from "@/app/_database/daos/userDao";
import slugify from "slugify";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { createPsychologist } from "@/app/_database/daos/psychologistDao";
import { sendNotification } from "./notification";
import { ReceiverTypes } from "@/app/_enums/ReceiverTypes";
import { Session } from "next-auth";
import { UserStates } from "@/app/_enums/UserStates";

export async function fetchRequests() {
  const session = await getMyServerSession();
  return await getRequestsByUserRole(session?.user.role!);
}

export async function hasPendingRequests(userId: string) {
  const requests = await getRequestsByUser(userId);
  return Boolean(
    requests.filter((request) => request.state === RequestStates.Pendiente)
      .length
  );
}

export async function sendRequest(
  formData: FormData,
  user: IUser,
  requestedRole: Roles
) {
  const previousRequests = await getRequestsByUser(user._id!);
  const promiseList: Promise<boolean | void>[] = [];
  for (let request of previousRequests) {
    promiseList.push(
      deleteFile(request.supportingDocumentId).then(() =>
        deleteRequest(request._id!)
      )
    );
  }
  await Promise.all(promiseList);
  const document = formData.get("document") as File;
  const bytes = await document.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const supportingDocumentId = await uploadFile(buffer, document.name);
  const request: IRequest = {
    firstName: user.firstName,
    lastName: user.lastName,
    requestedRole: requestedRole,
    supportingDocumentId: supportingDocumentId || "",
    user: user._id!,
    state: RequestStates.Pendiente,
  };
  return await createRequest(request);
}

export async function answerRequest(
  request: IRequest,
  state: RequestStates,
  requestingUser: IUser,
  comment?: string
) {
  const updatedRequest = {
    _id: request._id,
    state,
    comment,
  };
  await updateRequest(updatedRequest);
  const session = (await getMyServerSession()) as Session;
  if (state === RequestStates.Aprobado) {
    switch (request.requestedRole) {
      case Roles.Practicante:
        const fullName =
          requestingUser.firstName + " " + requestingUser.lastName;
        const upsertPsychologist: IPsychologist = {
          fullName: fullName,
          gender: requestingUser.gender || "Indefinido",
          profilePicture: requestingUser.profilePicture!,
          user: requestingUser._id!,
          slug: slugify(fullName),
          isPublic: true,
          state: UserStates.Activo,
        };
        await createPsychologist(upsertPsychologist);
      default:
        await updateUserById(request.user, {
          role: request.requestedRole,
          supportingDocumentId: request.supportingDocumentId,
        });
    }
  }
  sendNotification(
    { type: ReceiverTypes.User, id: requestingUser._id! },
    `El ${session.user.role} ${session.user.firstName} ${
      session.user.lastName
    } ha ${state.toLowerCase()} tu solicitud,
        ${
          state === RequestStates.Aprobado
            ? "inicia sesión de nuevo para ver los cambios"
            : `estos fueron sus comentarios:\n${comment}`
        }`,
    true,
    session.user.profilePicture!
  );
}
