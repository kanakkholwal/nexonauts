import mongoose, { Schema, model } from "mongoose";
import { nanoid } from "nanoid";

export type Author = {
  _id: string;
  name: string;
  username: string;
  profilePicture: string;
  profile: string | Record<string, any> | null;
  verified: boolean;
  createdAt: Date;
};

export interface PostType {
  title: string;
  description?: string;
  content: any;
  slug: string;
  labels: string[];
  image: string;
  state: "draft" | "published";
  author: Partial<Author>;
  claps: number;
  comments: {
    enabled: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type PostWithId = PostType & { _id: string };

export interface IPost extends PostType, Document {}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      default: () => `Untitled Post ${nanoid()}`,
    },
    description: String,
    content: {
      type: Schema.Types.Mixed,
      required: true,
      default: "Write a cool post",
      select: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(),
    },
    labels: { type: [String], required: true },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp",
    },
    state: {
      type: String,
      required: true,
      default: "draft",
      enum: ["draft", "published"],
    },
    author: { type: Schema.Types.Mixed, ref: "User", select: false },
    claps: { type: Number, default: 0 },
    comments: {
      enabled: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

postSchema.pre("save", async function (next) {
  if (!this.isModified("image")) {
    return next();
  }
  next();
});

export default mongoose.models?.Post || model<IPost>("Post", postSchema);
