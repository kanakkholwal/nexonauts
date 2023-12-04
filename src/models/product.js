import mongoose from 'mongoose';
import { product_types } from "src/lib/marketplace/item-types";
import { v4 as UuID4 } from 'uuid';


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    price:{
        type: Number,
        required: true,
        default: 0,
    },
    type:{
        type: String,
        required: true,
        default: product_types
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      default: '',
      select: false,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: () => UuID4(),
    },
    labels: {
      type: [String],
      required: true,
    },  
    coverImage: {
      type: String,
      default:
        'https://res.cloudinary.com/nexonauts/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp',
    },
    coverImage:[{
        type: String,
        default:
        'https://res.cloudinary.com/nexonauts/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp',
    }],
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['rejected','pending','approved'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Product || mongoose.model('Product', productSchema);
