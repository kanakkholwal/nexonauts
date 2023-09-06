import mongoose from 'mongoose';
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
    user: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'User',
        default: null,
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
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: [],
    }]

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
            default: `Write a cool post`,
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
                default:
                    'https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp',
            },
        },
        image: {
            type: String,
            default:
                'https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp',
        },
        state: {
            type: String,
            required: true,
            default: 'draft',
            enum: ['draft', 'published'],
        },
        author: {
            type: mongoose.Schema.Types.Mixed,
            ref: 'User',
            // required: true,
            select: false,
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
        },
        claps: {
            type: Number,
            default: 0,
        },
        comments: {
            enabled: {
                type: Boolean,
                default: true,
            },

        },
    },
    {
        timestamps: true,
    }
);

postSchema.pre('save', async function (next) {
    if (!this.isModified('image')) {
        return next();
    }
    this.metadata.image = this.image;
    next();
});

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default mongoose.models.Post || mongoose.model('Post', postSchema);
