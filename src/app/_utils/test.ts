import mongoose from "mongoose";
import { connect } from "../_database/connection";
import Request from "../_database/models/Request";
import { IRequest } from "../_interfaces/IRequest";
import { deleteFile, getAllFiles } from "./google-drive";

async function test() {
  await connect();
  const documentsToDelete: { _id: mongoose.Types.ObjectId; fileId: string }[] =
    [];
  const documentsUsers: { _id: mongoose.Types.ObjectId; count: number }[] =
    await Request.aggregate([
      {
        $group: {
          _id: "$user",
          count: { $count: {} },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);
  const promises = documentsUsers.map((document) =>
    Request.aggregate<IRequest>([
      {
        $match: {
          user: document._id,
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $limit: document.count,
      },
    ]).then((requests) => {
      documentsToDelete.push(
        ...requests.map((request) => ({
          _id: new mongoose.Types.ObjectId(request._id?.toString()!),
          fileId: request.supportingDocumentId,
        }))
      );
    })
  );
  Promise.all(promises).then(() => {
    return Promise.all(
      documentsToDelete.map((document) =>
        deleteFile(document.fileId).then(() =>
          Request.deleteOne({ _id: document._id })
        )
      )
    ).then((results) => console.log("Borrados", results.length, "elementos"));
  });
}

test2();
async function test2() {
  await connect();
  const driveFiles = await getAllFiles();
  const requestsFiles = (await Request.find().lean()).map(
    (request) => request.supportingDocumentId
  );
  let ac = 0;
  for (let i of driveFiles) {
    if (!requestsFiles.includes(i)) {
      await deleteFile(i);
      ac += 1;
    }
  }
  console.log("borrados", ac, "elementos");
}
