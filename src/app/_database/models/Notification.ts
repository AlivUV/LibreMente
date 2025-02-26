import { NotificationTypes } from "@/app/_enums/NotificationTypes";
import { ReceiverTypes } from "@/app/_enums/ReceiverTypes";
import { INotification } from "@/app/_interfaces/INotification";
import mongoose, { Model, Schema, model } from "mongoose";

const notificationSchema = new Schema<INotification>(
  {
    image: String,
    body: String,
    receiver: {
      id: String,
      type: {
        type: String,
        enum: {
          values: Object.values(ReceiverTypes),
        },
      },
    },
    simpleClear: Boolean,
    condition: {
      notificationType: {
        type: String,
        enum: {
          values: Object.values(NotificationTypes),
        },
      },
      clues: [String],
    },
  },
  { timestamps: true },
);

const Notification: Model<INotification> =
  mongoose.models.Notification || model("Notification", notificationSchema);

export default Notification;
