import mongoose, { Document, Schema, Types } from "mongoose";
import { customAlphabet } from 'nanoid';

const generateUrlSlug = (length = 16) => customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", length)();

interface Product extends Document {
  name: string;
  description: string;
  published: boolean;
  url: string;
  slug: string;
  thumbnail_url: string;
  preview_url: string | null;
  tags: string[];
  categories: string[];
  price: string | null;
  creator: Types.ObjectId;
  third_party: {
    provider: string | null;
    lastAsync: Date | null;
    product_id: string |null
  } | null;
}
const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      default: () => generateUrlSlug(8),
    },
    thumbnail_url: {
      type: String,
      trim: true,
      required: true,
    },
    preview_url: {
      type: String,
      trim: true,
      default: null,
    },
    tags: {
      type: [String],
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    price: {
      type: String,
      required: false,
      default: null,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    third_party: {
      provider: {
        type: String,
        required: false,
        default: null,
      },
      lastAsync: {
        type: Date,
        required: false,
        default: null,
      },
      product_id: {
        type: String,
        required: false,
        default: null,
      }
    }
  },{
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model<Product>("Product", productSchema);

export default Product