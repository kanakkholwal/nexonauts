import mongoose, { Document, Schema, Types } from "mongoose";
import { customAlphabet } from "nanoid";

const generateUrlSlug = (length = 16) =>
  customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )();

export type rawProduct = {
  name: string;
  description: string;
  published: boolean;
  url: string;
  slug: string;
  preview_url: string;
  tags: string[];
  categories: string[];
  price: number;
  third_party: {
    provider: string;
    lastAsync: Date;
    product_id: string;
  } | null;
};
export type rawProductThirdParty = Omit<rawProduct, "third_party"> & {
  third_party: {
    provider: string;
    lastAsync: Date;
    product_id: string;
  };
};

interface Product {
  name: string;
  description: string;
  published: boolean;
  url: string;
  slug: string;
  preview_url: string;
  tags: string[];
  categories: string[];
  price: number;
  creator: Types.ObjectId;
  third_party: {
    provider: string;
    lastAsync: Date;
    product_id: string;
  } | null;
}
export type ProductType = Product & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
export type ProductTypeWithCreator = ProductType & {
  creator: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
};

type ProductDocument = Document & Product;

const productSchema = new Schema<ProductDocument>(
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
    preview_url: {
      type: String,
      trim: true,
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
      type: Number,
      default: 0,
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
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
