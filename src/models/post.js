import mongoose from "mongoose";
import { v4 as UuID4 } from 'uuid';

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
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
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
});

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: 'Untitled',
        },
        description: String,
        content: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
            default: 'No Content',
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
        metadata: {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            keywords: {
                type: [String],
            },
            image: {
                type: String,
                default: 'https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp',
            },
        },
        image: {
            type: String,
            default: 'https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp',
        },
        state: {
            type: String,
            required: true,
            default: 'draft',
            enum: ['draft', 'published'],
        },
        author: {
            name: {
                type: String,
                required: true,
            },
            profileURL: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
                select: false,
            },
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
        comments: {
            enabled: {
                type: Boolean,
                default: true,
            },
            numberOfComments: {
                type: Number,
                default: 0,
            },
            items: {
                type: [commentSchema],
                select: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

postSchema.pre('save', async function (next) {
    if (!this.isModified('comments.items') && !this.isModified('image')) {
        return next();
    }
    this.comments.numberOfComments = this.comments.items.length;
    this.metadata.image = this.image;
    next();
});

export default mongoose.models.Post || mongoose.model('Post', postSchema)