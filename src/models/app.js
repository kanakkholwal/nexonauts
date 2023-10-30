import mongoose from 'mongoose';
import { v4 as UuID4 } from 'uuid';

function generateRandomAppId() {
  // Generate a random UUID
    const uuid = UuID4();

  // Take the first 10 characters of the UUID and remove any non-alphanumeric characters
    const alphanumericUsername = uuid.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);

  // Add a prefix (e.g., 'user_') to the alphanumeric username
    return `app_${alphanumericUsername}`;
}
const UsageSchema = new mongoose.Schema({
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
    },
    data:{
        type:mongoose.Schema.Types.Mixed,
        default:{}
    },
    type:{
        type:String,
        enum:["playground_usage" , "free_usage","pro_usage", "premium_usage" , "enterprise_usage"],
        default:"free_usage"
    }
});

const ReviewSchema = new mongoose.Schema({
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
        srequired: true,
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

const AppSchema = new mongoose.Schema({
    appId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: generateRandomAppId,
    },
    config: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    keywords: {
        type: [String],
        default: [],
        trim: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false,
    },
    hasCustomFunction: {
        type: Boolean,
        required: true,
        default: false,
    },
    status: {
        type: String,
        trim: true,
        default: "draft",
        enum: ["draft", "pending", "published", "declined", "archived"],
    },
    version: {
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
        default: "text_input_to_text_output",
    },
    categories: {
        type: [String],
        required: true,
        trim: true,
        default: ["productivity"],
    },
    tags: {
        type: [String],
        required: true,
        trim: true,
    },
    developer: {
        type: {
            name: String,
            username: String,
            userId: mongoose.Schema.Types.ObjectId,
        },
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
        default: () => `/apps/${generateRandomAppId()}`,
    },
    membership:{
        default:["free"],
        type:[{
            type:String,
            enum:["free" , "pro", "premium" , "enterprise"],
        }]
    },
    coverImage: {
        type: String,
        trim: true,
        default: null,
    },
    isRecommended: {
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
            type: String,
            name: String,
            label: String,
            placeholder: String,
            required: Boolean,
            defaultValue: String,
            value: String,
            id: String,
            options: {
                type: [{
                    label: String,
                    value: String,
                }],
                default: null,
            },
            constraints: {}
        }],
        controls: {
            type: [{
                controlType: String,
                id: String,
                text: String,
                icon: String,
                action: String,
                variant: String,
            }],
            default: [],
        },
        outputs: [{
            type: String,
            id: String,
            data: {
                type: mongoose.Schema.Types.Mixed,
                default: null,
            },
        }],
    },
});

// Define indexes for search functionality
// AppSchema.index({ name: 'text', description: 'text', tags: 'text', category: 'text', keywords: 'text', shortDescription: 'text' });

// Export review and usage schema as models;
let Review;
let Usage;
if (mongoose.models?.Review) {
    Review = mongoose.model('Review');
}else{
    Review = mongoose.model('Review', ReviewSchema);
}
if (mongoose.models?.Usage) {
    Usage = mongoose.model('Usage');
}else{
    Usage = mongoose.model('Usage', UsageSchema);
}
export { Review, Usage };
let App;
if (mongoose.models?.App) {
    App = mongoose.model('App');
} else{
    App = mongoose.model('App', AppSchema);
}
export default App
