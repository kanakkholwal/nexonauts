import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
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
    createdAt: () => Date.now(),
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    publishedAt: {
        type: Date,
        default: () => Date.now()
    },



});

