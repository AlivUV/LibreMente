import Roles from "@/app/_enums/Roles";
import { connect, serialize } from "../connection";
import Request from "../models/Request";
import mongoose, { FilterQuery } from "mongoose";
import { IRequest } from "@/app/_interfaces/IRequest";
import { RequestStates } from "@/app/_enums/RequestStates";
import { unstable_noStore as noStore } from "next/cache";

export async function getRequestsByUserRole(userRole: Roles) {
  noStore();
  await connect();
  const filterQuery: FilterQuery<IRequest> = { state: RequestStates.Pendiente };
  switch (userRole) {
    case Roles.Tutor:
      filterQuery.requestedRole = Roles.Practicante;
      break;
    case Roles.Monitor:
      filterQuery.$or = [
        { requestedRole: Roles.Practicante },
        { requestedRole: Roles.Tutor },
      ];
      break;
    default:
      break;
  }
  const requests = await Request.find(filterQuery).lean();
  return serialize(requests) as IRequest[];
}

export async function getRequestsByUser(user: string) {
  noStore();
  await connect();
  const requests = await Request.find({ user }).lean();
  return serialize(requests) as IRequest[];
}

export async function getRequestById(id: string) {
  noStore();
  await connect();
  const request = await Request.findById(id).lean();
  return serialize(request) as IRequest;
}

export async function createRequest(request: IRequest) {
  noStore();
  await connect();
  const result = await Request.create(request);
  return serialize(result) as IRequest;
}

export async function updateRequest(request: Partial<IRequest>) {
  noStore();
  await connect();
  const result = await Request.updateOne({ _id: request._id }, request);
  return Boolean(result.modifiedCount);
}

export async function deleteRequest(id: string) {
  noStore();
  await connect();
  const result = await Request.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return Boolean(result.deletedCount);
}
