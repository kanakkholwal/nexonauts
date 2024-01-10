import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';
import validator from 'validator';


function generateRandomUsername() {
  // Generate a random UUID
  const slug = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8)()

  // Add a prefix (e.g., 'user_') to the alphanumeric username
  return `user_${slug}`;
}
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username:{
        type: String,
        trim: true,
        required: true,
        unique: [true, "Username already exists"],
        default: () => generateRandomUsername(),
        
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Account already exists"],
      validate: [validator.isEmail, 'Please enter a valid email'],
      lowercase: true,
    },
    profilePicture: {
      type: String,
      default: 'https://res.cloudinary.com/nexonauts/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png',
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be at least 6 characters long"],
      select: false, // Don't send back password after request
    },
    providers:{
      type: Array,
      default: [],
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: ['user', 'admin'],
      },
    },
    account_type: {
      type: String,
      default: 'free',
      enum: {
        values: ['free', 'pro', 'premium'],
      },
    },
    aditional_info: {
      github: {
        type: String,
        default: null,
      },
      linkedin: {
        type: String,
        default: null,
      },
      twitter: {
        type: String,
        default: null,
      },
      instagram: {
        type: String,
        default: null,
      },
      website:{
        type: String,
        default: null,
      },
    },

    verificationToken: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },{
    timestamps: true,
  }
);


// Middleware to hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
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
UserSchema.pre('save', async function (next) {
  if (!this.isModified('verificationToken')) {
    return next();
  }
  if (this.isModified('email')) {
    this.verified = false;
  }
  if(this.isModified('verificationToken')) {
    if(this.verificationToken === null) {
      this.verified = true;
    }
  }
  next();

});

// Method to compare password
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};


export default mongoose.models?.User || mongoose.model('User', UserSchema)