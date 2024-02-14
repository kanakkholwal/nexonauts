import mongoose, { Document, Types } from "mongoose";

export interface rawRatingType {
    userId: string;
    toolId: string;
    rating: number;
    comment: string;
}

export interface RatingType {
    userId: string;
    toolId: string;
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface RatingTypeWithId extends RatingType {
    _id: string;
}
export interface IRating extends Document {
    userId: Types.ObjectId;
    toolId: Types.ObjectId;
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}
const ratingSchema = new mongoose.Schema<IRating>({
    userId: { type: Types.ObjectId, ref: 'User' },
    toolId: { type: Types.ObjectId, ref: 'PublicTool' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: {
        type: String, minlength: 10, maxlength: 500,
        default: "No comment provided"
    },
}, { timestamps: true });

const Rating = mongoose.models.Rating || mongoose.model<IRating>('Rating', ratingSchema);

export default Rating;
