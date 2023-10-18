import mongoose from 'mongoose';

const usageSchema = new mongoose.Schema({
    appId: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    usage: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: {},
    }
});
const reviewSchema = new mongoose.Schema({
    appId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
        default: "No review",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const appSchema = new mongoose.Schema({
    appId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    usage: {
        type: [usageSchema],
        select: false,
        default: [],
    },
    reviews: {
        type: [reviewSchema],
        select: false,
        default: [],
    },
    config:{
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    keywords:{
        type: [String],
        default: [],
        trim: true,
    },
    enabled: {
        type: Boolean,
        required: true,
        default: false,
    },
    customFunction: {
        type: Boolean,
        required: true,
        default: false,
    },
    state:{
        type: String,
        trim: true,
        default: "draft",
        enum: ["draft", "pending", "published", "declined", "archived"],
    },
    version:{
        type: String,
        trim: true, 
        default: "1.0.0",
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    tags: {
        type: [String],
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: {
            name: "K K UPGRADER",
            username: "kkupgrader",
            userId: null,
        }
    },
    path: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    coverImage: {
        type: String,
        trim: true,
    },
    recommended: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    averageRating: {
        type: Number,
        required: true,
        default: 0,
    },
    formFlow: {
        menuType: {
            type: String,
            required: true,
            trim: true,
            default: "text_input_to_text_output",
        },
        inputs: [{
            inputType: String,
            inputName: String,
            inputLabel: String,
            inputPlaceholder: String,
            inputRequired: Boolean,
            inputDefaultValue: String,
            inputValue: String,
            inputId: String,
            inputOptions: {
                type: [{
                    label: String,
                    value: String,
                }],
                default: null
            },
            constraints: {}
        }],
        controls: {
            type:[{
                controlType: String,
                id: String,
                text: String,
                icon: String,
                action: String,
                variant: String
            }],
            default: []
        },
        outputs: [{
            outputType: String,
            id: String,
            data:{
                type: mongoose.Schema.Types.Mixed,
                default: null,
            }
        }]
    }
});
// appSchema.index({ name: 'text', description: 'text', tags: 'text',category: 'text', keywords: 'text',shortDescription: 'text' });

// Also change TYPES schema
// export review and usage schema as model
export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export const Usage = mongoose.models.Usage || mongoose.model('Usage', usageSchema);
export default mongoose.models.App || mongoose.model('App', appSchema);
