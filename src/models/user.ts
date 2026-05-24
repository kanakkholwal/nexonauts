import * as bcrypt from "bcryptjs";
import mongoose, { CallbackError, Document, Schema } from "mongoose";
import { customAlphabet } from "nanoid";
import { z } from "zod";

interface User extends Document {
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  password: string;
  role: string;
  account_type: string;
  additional_info: Record<string, string | null>;
  verificationToken: string | null;
  verified: boolean;
}

const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be at most 30 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers");

const emailSchema = z.string().email("Please enter a valid email");

function generateRandomUsername(): string {
  const slug = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    8
  )();
  return `user_${slug}`;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, trim: true, required: true },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      default: () => generateRandomUsername(),
      validate: {
        validator: (val: string) => usernameSchema.safeParse(val).success,
        message: "Username can only contain letters and numbers"
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (val: string) => emailSchema.safeParse(val).success,
        message: "Please enter a valid email"
      }
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/nexonauts/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    account_type: {
      type: String,
      default: "free",
      enum: ["free", "pro", "premium"]
    },
    verificationToken: { type: String, default: null },
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

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
  if (this.isModified("verificationToken") && this.verificationToken === null) {
    this.verified = true;
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.models?.User || mongoose.model<User>("User", userSchema);

export default User;
