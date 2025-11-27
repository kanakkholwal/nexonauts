import * as bcrypt from "bcryptjs";
import mongoose, { CallbackError, Document, Schema, Types } from "mongoose";
import { customAlphabet } from "nanoid";
import { z } from "zod";

// ---------------- Interfaces ----------------
interface Integration {
  gumroad: {
    access_token: string | null;
    scope: string | null;
    integrated: boolean;
    lastAuthorized: Date | null;
  };
  github: {
    access_token: string | null;
    scope: string | null;
    integrated: boolean;
    lastAuthorized: Date | null;
  };
}

interface User extends Document {
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  password: string;
  role: string;
  profile: Types.ObjectId;
  account_type: string;
  integrations: Integration | null;
  additional_info: Record<string, string | null>;
  verificationToken: string | null;
  verified: boolean;
}

interface IntegrationSchema extends Document {
  gumroad: {
    access_token: string | null;
    scope: string;
    integrated: boolean;
    lastAuthorized: Date | null;
  };
  github: {
    access_token: string | null;
    scope: string | null;
    integrated: boolean;
    lastAuthorized: Date | null;
  };
}

// ---------------- Zod Schemas ----------------
const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be at most 30 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers");

const emailSchema = z.string().email("Please enter a valid email");

// ---------------- Integration Schema ----------------
const integrationSchema = new Schema<IntegrationSchema>({
  gumroad: {
    scope: {
      type: String,
      default: "edit_products",
      enum: ["edit_products", "view_profile", "view_sales"],
    },
    access_token: { type: String, default: null },
    integrated: { type: Boolean, default: true },
    lastAuthorized: { type: Date, default: null },
  },
  github: {
    scope: { type: String, default: "repo" },
    access_token: { type: String, default: null },
    integrated: { type: Boolean, default: false },
    lastAuthorized: { type: Date, default: null },
  },
});

// ---------------- Helpers ----------------
function generateRandomUsername(): string {
  const slug = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    8
  )();
  return `user_${slug}`;
}

// ---------------- User Schema ----------------
const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      default: () => generateRandomUsername(),
      validate: {
        validator: (val: string) => {
          const result = usernameSchema.safeParse(val);
          return result.success;
        },
        message: "Username can only contain letters and numbers",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (val: string) => emailSchema.safeParse(val).success,
        message: "Please enter a valid email",
      },
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/nexonauts/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "waitlist"],
    },
    account_type: {
      type: String,
      default: "free",
      enum: ["free", "pro", "premium"],
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    integrations: {
      select: false,
      type: integrationSchema,
      default: {
        gumroad: {
          scope: "edit_products",
          access_token: null,
          integrated: true,
          lastAuthorized: null,
        },
        github: {
          scope: "repo",
          access_token: null,
          integrated: false,
          lastAuthorized: null,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// ---------------- Middlewares ----------------
userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    return next(err as CallbackError);
  }
});

userSchema.pre<User>("save", function (next) {
  if (this.isModified("email")) {
    this.verified = false;
  }
  if (this.isModified("verificationToken")) {
    if (this.verificationToken === null) {
      this.verified = true;
    }
  }
  next();
});

// ---------------- Methods ----------------
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// ---------------- Model ----------------
const User = mongoose.models?.User || mongoose.model<User>("User", userSchema);

export default User;
