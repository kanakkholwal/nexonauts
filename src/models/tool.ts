import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { customAlphabet } from "nanoid";

export interface rawCategory {
  name: string;
  slug: string;
}
export interface ICategory extends Document, rawCategory {}

export type PublicToolStatus =
  | "draft"
  | "published"
  | "archived"
  | "deleted"
  | "pending"
  | "rejected";
export type PublicToolPricingType =
  | "free"
  | "paid"
  | "freemium"
  | "one_time_license"
  | "subscription"
  | "open_source"
  | "other";

export type rawPublicToolType = {
  name: string;
  coverImage: string;
  bannerImage?: string;
  description: string;
  categories: rawCategory[];
  tags: string[];
  link: string;
  slug: string;
  status: PublicToolStatus;
  pricing_type: PublicToolPricingType;
  verified: boolean;
};
export interface PublicToolType extends rawPublicToolType {
  categories: ICategory[];
  author: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PublicToolTypeWithId extends PublicToolType {
  _id: string;
  bookmarks: string[];
  views: number;
}
export interface IPublicTool extends Document, PublicToolType {
  bookmarks: Types.ObjectId[];
  views: number;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, trim: true },
  slug: { type: String, unique: true, trim: true },
});

const publicToolSchema = new mongoose.Schema<IPublicTool>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      unique: true,
      trim: true,
      default: customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        16
      )(),
    },
    coverImage: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/150",
    },
    bannerImage: { type: String, default: "https://via.placeholder.com/920" },
    description: { type: String, required: true, default: "" },
    categories: [categorySchema],
    link: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: [
        "draft",
        "published",
        "archived",
        "deleted",
        "pending",
        "rejected",
        "expired",
      ],
      default: "draft",
    },
    tags: { type: [String], default: [] },
    pricing_type: {
      type: String,
      required: true,
      trim: true,
      default: "other",
    },
    verified: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    bookmarks: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const PublicTool: Model<IPublicTool> =
  mongoose.models.PublicTool ||
  mongoose.model<IPublicTool>("PublicTool", publicToolSchema);

export default PublicTool;
