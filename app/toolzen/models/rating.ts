import mongoose, { Document, Model } from 'mongoose';

export interface IRating extends Document {
    userId: string;
    toolId: string;
    rating: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ratingSchema = new mongoose.Schema<IRating>({
    userId: { type: String, required: true },
    toolId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String,minlength: 10, maxlength: 500 },
},{timestamps: true});

const Rating: Model<IRating> = mongoose.models.Rating || mongoose.model<IRating>('Rating', ratingSchema);

export default Rating;
