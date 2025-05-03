import mongoose, { type Document, Schema } from "mongoose";

// Define a user schema
interface INotification extends Document {
  title: string;
  message: string;
  type: string;
  from: {
    origin: string;
    id: string;
  };
  to: {
    origin: string;
    id: string | string[];
  };
  read: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    from: {
      origin: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    to: {
      origin: {
        type: String,
        required: true,
      },
      id: {
        type: [String],
        required: true,
      },
    },
    type: {
      type: String,
      required: true,
      enum: [
        "comment",
        "post",
        "like",
        "follow",
        "mention",
        "reply",
        "message",
        "system",
      ],
      default: "system",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
