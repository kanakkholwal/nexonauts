import mongoose, { Document, Model } from 'mongoose';
import { v4 as UuID4 } from 'uuid';

// Function to generate a random UUID-based AppId
function generateRandomAppId() {
    const uuid = UuID4();
    const alphanumericUsername = uuid.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);
    return `app_${alphanumericUsername}`;
}

// Interface for Review document
export interface IReview extends Document {
    appId: string;
    userId: string;
    rating: number;
    review: string;
    createdAt?: Date;
}

// Review schema definition
const reviewSchema = new mongoose.Schema<IReview>(
    {
        appId: { type: String, required: true },
        userId: String,
        rating: { type: Number, required: true },
        review: { type: String, required: true, default: 'No review' },
    },
    { timestamps: true }
);

// Interface for Usage document
export interface IUsage extends Document {
    appId: string;
    userId: mongoose.Types.ObjectId;
    createdAt?: Date;
    usage: mongoose.Schema.Types.Mixed;
    data: mongoose.Schema.Types.Mixed;
    type: 'playground_usage' | 'free_usage' | 'pro_usage' | 'premium_usage' | 'enterprise_usage';
    model_used: 'text-bison-001' | 'gpt-3.5-turbo-instruct' | 'davinci' | 'ada' | 'curie' | 'babbage';
}

// Usage schema definition
const usageSchema = new mongoose.Schema<IUsage>(
    {
        appId: { type: String, required: true, trim: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        usage: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
        data: { type: mongoose.Schema.Types.Mixed, default: {} },
        type: {
            type: String,
            enum: ['playground_usage', 'free_usage', 'pro_usage', 'premium_usage', 'enterprise_usage'],
            default: 'free_usage',
        },
        model_used: {
            type: String,
            required: true,
            enum: ['text-bison-001', 'gpt-3.5-turbo-instruct', 'davinci', 'ada', 'curie', 'babbage'],
        },
    },
    { timestamps: true }
);

// Interface for App document
export interface IApp extends Document {
    appId: string;
    config?: mongoose.Schema.Types.Mixed;
    keywords: string[];
    isPublic: boolean;
    hasCustomFunction: boolean;
    status: 'draft' | 'pending' | 'published' | 'declined' | 'archived';
    version: string;
    name: string;
    shortDescription: string;
    description: string;
    type: string;
    categories: string[];
    tags: string[];
    developer: { name: string; username: string; userId: string | null };
    path: string;
    membership: ('free' | 'pro' | 'premium')[];
    coverImage: string | null;
    icon: string;
    isRecommended: boolean;
    averageRating: number;
    formFlow: {
        menuType: string;
        inputs: {
            type: string;
            name: string;
            label: string;
            placeholder: string;
            required: boolean;
            defaultValue: string;
            value: string;
            id: string;
            options: { label: string; value: string }[] | null;
            constraints: {};
        }[];
        controls: {
            controlType: string;
            id: string;
            text: string;
            icon: string;
            action: string;
            variant: string;
        }[];
        outputs: { render_type: string; save_to_db: boolean };
    };
    createdAt?: Date;
    updatedAt?: Date;
}

// App schema definition with text search indexes
const appSchema = new mongoose.Schema<IApp>(
    {
        appId: { type: String, required: true, trim: true, unique: true, default: generateRandomAppId },
        config: { type: mongoose.Schema.Types.Mixed, default: null },
        keywords: { type: [String], default: [], trim: true },
        isPublic: { type: Boolean, required: true, default: false },
        hasCustomFunction: { type: Boolean, required: true, default: false },
        status: {
            type: String,
            trim: true,
            default: 'draft',
            enum: ['draft', 'pending', 'published', 'declined', 'archived'],
        },
        version: { type: String, trim: true, default: '1.0.0' },
        name: { type: String, required: true, trim: true },
        shortDescription: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true, default: 'text_input_to_text_output' },
        categories: { type: [String], required: true, trim: true, default: ['productivity'] },
        tags: { type: [String], required: true, trim: true },
        developer: {
            type: {
                name: String,
                username: String,
                userId: String,
            },
            required: true,
            default: {
                name: 'Kanak',
                username: 'kanakkholwal',
                userId: null,
            },
        },
        path: { type: String, required: true, trim: true, unique: true, default: () => `${generateRandomAppId()}` },
        membership: {
            default: ['free'],
            type: [
                {
                    type: String,
                    enum: ['free', 'pro', 'premium'],
                },
            ],
        },
        coverImage: { type: String, trim: true, default: null },
        icon: { type: String, trim: true, default: '/assets/images/default_app.png' },
        isRecommended: { type: Boolean, required: true, default: false },
        averageRating: { type: Number, required: true, default: 0 },
        formFlow: {
            menuType: { type: String, required: true, trim: true, default: 'text_input_to_text_output' },
            inputs: [
                {
                    type: String,
                    name: String,
                    label: String,
                    placeholder: String,
                    required: Boolean,
                    defaultValue: String,
                    value: String,
                    id: String,
                    options: {
                        type: [
                            {
                                label: String,
                                value: String,
                            },
                        ],
                        default: null,
                    },
                    constraints: {},
                },
            ],
            controls: {
                type: [
                    {
                        controlType: String,
                        id: String,
                        text: String,
                        icon: String,
                        action: String,
                        variant: String,
                    },
                ],
                default: [],
            },
            outputs: { type: Object, default: { render_type: 'markdown', save_to_db: false } },
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

// Define indexes for text search functionality
appSchema.index({
    name: 'text',
    description: 'text',
    tags: 'text',
    categories: 'text',
    keywords: 'text',
    shortDescription: 'text',
});

// Model creation for Review, Usage, and App
const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);
const Usage: Model<IUsage> = mongoose.models.Usage || mongoose.model<IUsage>('Usage', usageSchema);
const App: Model<IApp> = mongoose.models.App || mongoose.model<IApp>('App', appSchema);

export { App, Review, Usage };
export default App;
