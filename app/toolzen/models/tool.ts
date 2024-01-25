import mongoose, { Document, Model } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    slug: string;
}

export interface IAuthor {
    name: string;
    email: string;
    public_link: string;
    userId: string | null;
}
export type PublicToolStatus = 'draft' | 'published' | 'archived' | 'deleted' | 'pending' | 'rejected';
export type PublicToolPricingType = 'free' | 'paid' | 'freemium' | 'one_time_license' | 'subscription' | 'open_source' | 'other';
export interface PublicToolType {
    name: string;
    slug: string;
    coverImage: string;
    bannerImage?: string;
    description: string;
    categories: ICategory[];
    link: string;
    status: PublicToolStatus;
    pricing_type: PublicToolPricingType
    verified: boolean;
    author?: IAuthor;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface PublicToolTypeWithId extends PublicToolType {
    _id: string;
}
export interface IPublicTool extends Document , PublicToolType {}

const categorySchema = new mongoose.Schema({
    name: { type: String, trim: true },
    slug: { type: String, unique: true, trim: true }
});

const authorSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    public_link: { type: String },
    userId: { type: String }
});

const publicToolSchema = new mongoose.Schema<IPublicTool>({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    coverImage: { type: String, required: true, default: 'https://via.placeholder.com/150' },
    bannerImage: { type: String },
    description: { type: String, required: true },
    categories: [categorySchema],
    link: { type: String, required: true },
    status: { type: String, required: true, enum: ['draft', 'published', 'archived', 'deleted', 'pending', 'rejected'], default: 'draft' },
    pricing_type: { type: String, required: true, trim: true, default: 'other' },
    verified: { type: Boolean, default: false },
    author: { type: authorSchema, required: false, default: { name: 'Kanak', email: 'kanakkholwal@gmail.com', public_link: 'https://kanakkholwal.eu.org', userId: null } }
},{ timestamps: true });

const PublicTool: Model<IPublicTool> = mongoose.models.PublicTool || mongoose.model<IPublicTool>('PublicTool', publicToolSchema);

export default PublicTool;