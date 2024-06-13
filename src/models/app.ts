import mongoose, { Document, Model } from 'mongoose';
import { customAlphabet } from 'nanoid';

//  types for App, Review, and Usage models
export interface inputType {
  field_type: string;
  field_name: string;
  field_label: string;
  field_placeholder: string;
  field_required: boolean;
  field_defaultValue: string;
  field_id: string;
  options: { label: string; value: string }[];
  constraints: {};
}
export interface controlType {
  controlType: string;
  id: string;
  text: string;
  icon: string;
  action: string;
  variant: string;
}
export interface outputType {
  render_type: string;
  save_to_db: boolean;
}
export interface formFlowType {
  menuType: string;
  inputs: inputType[];
  controls: controlType[];
  output: outputType;
}
export interface ConfigurationType {
  model: string;
  prompt: string;
  modelType: string; // 'text-generation' | 'text-classification' | 'text-to-sql' | 'text-to-text' | 'text-to-image' | 'text-to-html' | 'text-to-csv' | 'text-to-json' | 'text-to-xml' | 'text-to-markdown' | 'text-to-y
  params: {
    [key: string]: any;
  };
  [key: string]: string | object;
}
export interface MetaDataType {
  readonly appId: string;
  name: string;
  description: string;
  tags: string[];
  categories: string[];
  developer: {
    name: string;
    username: string;
    userId: mongoose.Schema.Types.ObjectId | string;
  };
  slug: string;
  status: 'draft' | 'pending' | 'published' | 'declined' | 'archived';
  icon: string;
  bannerImage: string | null;
}
export interface AppType extends MetaDataType {
  config: ConfigurationType | null;
  formFlow: formFlowType;
  version: string;
  membership: ('free' | 'pro' | 'premium')[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface AppTypeWithId extends AppType {
  readonly _id: string;
}
interface IApp extends Document, AppType {}

export interface ReviewType {
  appId: string;
  userId: string;
  rating: number;
  review: string;
  upvotes: number;
  downvotes: number;
  createdAt?: Date;
}
export interface ReviewTypeWithId extends ReviewType {
  readonly _id: string;
}
interface IReview extends Document, ReviewType {}

export interface UsageType {
  appId: string;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  type: 'playground_usage' | 'free_usage' | 'pro_usage' | 'premium_usage';
  usage: {
    [key: string]: any;
  };
  model_used: string;
}
export interface UsageTypeWithId extends UsageType {
  readonly _id: string;
}
interface IUsage extends Document, UsageType {}

// Function to generate a random UUID-based AppId
function generateRandomAppId(): string {
  // Generate a random 16-character alphanumeric string
  const slug = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    16
  )();
  return `${slug}`;
}

// Review schema definition
const reviewSchema = new mongoose.Schema<IReview>(
  {
    appId: { type: String, required: true },
    userId: String,
    rating: { type: Number, required: true },
    upvotes: { type: Number, required: true, default: 0 },
    downvotes: { type: Number, required: true, default: 0 },
    review: { type: String, required: true, default: 'No review' },
  },
  { timestamps: true }
);

// Usage schema definition
const usageSchema = new mongoose.Schema<IUsage>({
  appId: { type: String, required: true, trim: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  usage: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
  type: {
    type: String,
    default: 'free_usage',
  },
  model_used: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// App schema definition with text search indexes
const appSchema = new mongoose.Schema<IApp>(
  {
    appId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      default: () => `app_${generateRandomAppId()}`,
    },
    config: {
      type: Object,
      default: {
        prompt: 'Write a prompt here',
        model: 'gemini-pro',
      },
    },
    status: {
      type: String,
      trim: true,
      default: 'draft',
      enum: ['draft', 'pending', 'published', 'declined', 'archived'],
    },
    version: { type: String, trim: true, default: '1.0.0' },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    categories: {
      type: [String],
      required: true,
      trim: true,
      default: ['productivity'],
    },
    tags: { type: [String], required: true, trim: true },
    developer: {
      name: { type: String, required: true, trim: true },
      username: { type: String, required: true, trim: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
      },
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      default: () => `${generateRandomAppId()}`,
    },
    membership: {
      default: ['free'],
      type: [
        {
          type: String,
          enum: ['free', 'pro', 'premium'],
        },
      ],
    },
    bannerImage: { type: String, trim: true, default: null },
    icon: {
      type: String,
      trim: true,
      default: '/assets/images/default_app.png',
    },
    formFlow: {
      menuType: {
        type: String,
        required: true,
        trim: true,
        default: 'text_input_to_text_output',
      },
      inputs: [
        {
          field_type: String,
          field_name: String,
          field_label: String,
          field_placeholder: String,
          field_required: Boolean,
          field_defaultValue: String,
          field_id: String,
          options: {
            type: [
              {
                label: String,
                value: String,
              },
            ],
            default: [],
          },
          constraints: {
            type: Object,
            default: {},
          },
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
      output: {
        type: Object,
        default: { render_type: 'markdown', save_to_db: false },
      },
    },
  },
  { timestamps: true }
);

// Define indexes for text search functionality
appSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  categories: 'text',
  'developer.name': 'text',
});

// Model creation for Review, Usage, and App
const AppReview: Model<IReview> =
  mongoose.models.AppReview ||
  mongoose.model<IReview>('AppReview', reviewSchema);
const AppUsage: Model<IUsage> =
  mongoose.models.AppUsage || mongoose.model<IUsage>('AppUsage', usageSchema);
const App: Model<IApp> =
  mongoose.models.App || mongoose.model<IApp>('App', appSchema);

export { App, AppReview, AppUsage };
export default App;
