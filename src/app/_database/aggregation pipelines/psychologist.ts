import { UserStates } from "@/app/_enums/UserStates";
import { PipelineStage, Types } from "mongoose";

export function getPsychologistsByTutorPipeline(
  tutorId: string,
  activeOnly: boolean
) {
  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user_details",
      },
    },
    {
      $unwind: "$user_details",
    },
    {
      $match: {
        "user_details.responsibleUser": new Types.ObjectId(tutorId),
        "user_details.state": activeOnly ? UserStates.Activo : { $nin: [] },
      },
    },
    {
      $unset: "user_details",
    },
  ];
  return pipeline;
}
