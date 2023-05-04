import mongoose from "mongoose";

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
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    children: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }

});
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        select:false
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    labels: [
        {
            type: String,
            required: true,
        }
    ],
    image: {
        type: String,
        default: 'https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp'
    },
    state: {
        type: String,
        required: true,
        default: 'draft',
        enum: {
            values: [
                'draft',
                'published'
            ],

        },
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    publishedAt: {
        type: Date,
        default: () => Date.now()
    },
    comments: {
        select: false,
        enabled: {
            type: Boolean,
            default: true,
        },
        items: {
            type: [commentSchema],

        }
    }

});

export default mongoose.models.Post || mongoose.model('Post', postSchema)