import mongoose from 'mongoose';
import { product_types } from "src/lib/marketplace/item-types";
import { v4 as UuID4 } from 'uuid';

const productRatingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    default: '',
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    short_description: {
      type: String,
      required: true,
      minLength: 10,
      trim: true,
    },
    description: {
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
      trim: true,
      default: () => UuID4(),
    },
    price:{
        type: Number,
        required: true,
        default: 0,
    },
    type:{
        type: String,
        required: true,
        trim: true,
        default: product_types
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
    photos:[{
        type: String,
        trim: true,
    }],
    ratings:{
      type:[productRatingSchema],
      default: [],
    },
    likes:{
      type:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }],
      default: [],
    },
    views:{
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['rejected','pending','approved'],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  },{
    timestamps: true,
  }
);
productSchema.index({ title: 'text', description: 'text',short_description: 'text' ,labels: 'text' });

export const ProductRating = mongoose.models.ProductRating || mongoose.model('ProductRating', productRatingSchema);
export default mongoose.models.Product || mongoose.model('Product', productSchema);
