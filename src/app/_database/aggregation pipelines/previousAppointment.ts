import PatientFilters from "@/app/_enums/reports/PatientFilters";
import mongoose, { PipelineStage } from "mongoose";

export function filterYearlyActivePatientsPipeline(
  filter: PatientFilters,
  year: number,
) {
  const pipeline: PipelineStage[] = [
    {
      $match: {
        $expr: {
          $eq: [{ $year: "$date" }, year],
        },
      },
    },
    {
      $group: {
        _id: "$patient",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "patient",
      },
    },
    {
      $unwind: "$patient",
    },
    {
      $group: {
        _id: `$patient.${filter}`,
        count: { $count: {} },
      },
    },
  ];
  if (filter === PatientFilters.Age) {
    pipeline.splice(4, 0, {
      $addFields: {
        "patient.age": {
          $floor: {
            $divide: [
              {
                $subtract: [new Date(), "$patient.dateOfBirth"],
              },
              365 * 24 * 60 * 60 * 1000,
            ],
          },
        },
      },
    });
  }
  return pipeline;
}

export function filterAppointmentsByPsychologistPipeline(
  filter: PatientFilters,
  psychologist?: string,
) {
  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: "users",
        localField: "patient",
        foreignField: "_id",
        as: "patient",
      },
    },
    {
      $unwind: "$patient",
    },
    {
      $group: {
        _id: `$patient.${filter}`,
        count: { $count: {} },
      },
    },
  ];
  if (filter === PatientFilters.Age) {
    pipeline.splice(2, 0, {
      $addFields: {
        "patient.age": {
          $floor: {
            $divide: [
              {
                $subtract: [new Date(), "$patient.dateOfBirth"],
              },
              365 * 24 * 60 * 60 * 1000,
            ],
          },
        },
      },
    });
  }
  if (psychologist) {
    pipeline.unshift({
      $match: {
        psychologist: new mongoose.Types.ObjectId(psychologist),
      },
    });
  }
  return pipeline;
}
