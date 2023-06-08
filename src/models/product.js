import mongoose from 'mongoose';
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
    description: String,
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: [
        {
          type: 'paragraph',
          children: [{ text: 'Describe Your product' }],
        },
      ],
      select: false,
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
        'https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp',
    },
    thumbnail:[{
        type: String,
        default:
        'https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp',
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
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    analytics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
      default: null,
    }
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Product || mongoose.model('Product', productSchema);
