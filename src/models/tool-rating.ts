import mongoose, { Document, Schema, Types } from 'mongoose';

export interface rawRatingType {
  userId: string;
  toolId: string;
  rating: number;
  comment: string;
}

export type RatingTypeWithId = Omit<rawRatingType, 'userId'> & {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
};

export interface RatingDocument extends Document {
  userId: Types.ObjectId;
  toolId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ratingSchema = new Schema<RatingDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    toolId: { type: Schema.Types.ObjectId, ref: 'PublicTool', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: {
      type: String,
      minlength: 10,
      maxlength: 500,
      default: 'No comment provided',
    },
  },
  { timestamps: true }
);

const Rating =
  mongoose.models.Rating ||
  mongoose.model<RatingDocument>('Rating', ratingSchema);

export default Rating;
