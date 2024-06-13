import bcrypt from "bcryptjs";
import mongoose, { Document, Schema, Types } from "mongoose";
import { customAlphabet } from "nanoid";
import validator from "validator";

// Define a user schema

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

const integrationSchema = new Schema<IntegrationSchema>({
  gumroad: {
    scope: {
      type: String,
      default: "edit_products",
      enum: {
        values: ["edit_products", "view_profile", "view_sales"],
      },
    },
    access_token: {
      type: String,
      default: null,
    },
    integrated: {
      type: Boolean,
      default: true,
    },
    lastAuthorized: {
      type: Date,
      default: null,
    },
  },
  github: {
    scope: {
      type: String,
      default: "repo",
    },
    access_token: {
      type: String,
      default: null,
    },
    integrated: {
      type: Boolean,
      default: false,
    },
    lastAuthorized: {
      type: Date,
      default: null,
    },
  },
});

function generateRandomUsername(): string {
  // Generate a random UUID
  const slug = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    8
  )();

  // Add a prefix (e.g., 'user_') to the alphanumeric username
  return `user_${slug}`;
}
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
      validate: [
        validator.isAlphanumeric,
        "Username can only contain letters and numbers",
      ],
      default: () => generateRandomUsername(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
      lowercase: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/nexonauts/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png",
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be at least 6 characters long"],
      select: false, // Don't send back password after request
    },

    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin", "waitlist"],
      },
    },
    account_type: {
      type: String,
      default: "free",
      enum: {
        values: ["free", "pro", "premium"],
      },
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

// Middleware to hash password before saving
userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("verificationToken")) {
    return next();
  }
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

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;
