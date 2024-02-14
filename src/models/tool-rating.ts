import mongoose, {Model, Document, Types } from "mongoose";

export interface IRating extends Document {
    userId: Types.ObjectId;
    toolId: Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ratingSchema = new mongoose.Schema<IRating>({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    toolId: { type: Types.ObjectId, ref: 'PublicTool', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String,minlength: 10, maxlength: 500 },
},{timestamps: true});

const Rating: Model<IRating> = mongoose.models.Rating || mongoose.model<IRating>('Rating', ratingSchema);

export default Rating;
