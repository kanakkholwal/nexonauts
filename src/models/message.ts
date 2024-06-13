import mongoose, { Document, Schema } from 'mongoose';

// Define a user schema
interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  subject: string;
  read: boolean;
  type: string;
  aditional_info: Record<string, string | null>;
}

const messageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      default: 'No Subject',
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'contact',
        'post',
        'like',
        'follow',
        'mention',
        'reply',
        'message',
        'system',
      ],
      default: 'system',
    },
    read: {
      type: Boolean,
      default: false,
    },
    aditional_info: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message;
