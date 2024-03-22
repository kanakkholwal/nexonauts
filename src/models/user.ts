import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema, Types } from "mongoose";
import { customAlphabet } from 'nanoid';
import validator from 'validator';

// Define a user schema
interface User extends Document {
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  password: string;
  providers: string[];
  role: string;
  dev_account: {
    bio: string;
    socials: Record<string, string>;
    bio_link: string;
    dev_type: string;
  }
  account_type: string;
  private: boolean;
  integrations: {
    gumroad: {
      access_token: string;
      scope: string;
      integrated: boolean;
      lastAuthorized: Date | null;
    },
    github: {
      access_token: string;
      refresh_token: string | null;
      scope: string | null;
      integrated: boolean;
      lastAuthorized: Date | null;
    },
  }
  additional_info: Record<string, string | null>
  verificationToken: string | null;
  verified: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}


function generateRandomUsername(): string {
  // Generate a random UUID
  const slug = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8)()

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
      validate: [validator.isAlphanumeric, 'Username can only contain letters and numbers'],
      default: () => generateRandomUsername(),

    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
      lowercase: true,
    },
    profilePicture: {
      type: String,
      default: 'https://res.cloudinary.com/nexonauts/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png',
    },
    private: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be at least 6 characters long"],
      select: false, // Don't send back password after request
    },
    providers: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: ['user', 'admin', "waitlist"],
      },
    },
    account_type: {
      type: String,
      default: 'free',
      enum: {
        values: ['free', 'pro', 'premium'],
      },
    },
    dev_account: {
      bio: {
        type: String,
        default: '',
      },
      socials: {
        type: Object,
        default: {},
      },
      bio_link: {
        type: String,
        default: '',
      },
      dev_type: {
        type: String,
        default: 'developer',
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
    followers: [{ type: Types.ObjectId, ref: 'User' }],
    following: [{ type: Types.ObjectId, ref: 'User' }],
    integrations: {
      select: false,
      type: {
        gumroad: {
          scope: {
            type: String,
            default: "edit_products",
            enum: {
              values: ["edit_products", "view_profile", "view_sales"],
            }
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
      },
    }
  }, {
  timestamps: true,
}
);


// Middleware to hash password before saving
userSchema.pre<User>('save', async function (next) {
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

userSchema.pre<User>('save', async function (next) {
  if (!this.isModified('verificationToken')) {
    return next();
  }
  if (this.isModified('email')) {
    this.verified = false;
  }
  if (this.isModified('verificationToken')) {
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
userSchema.statics.findCommonFollowers = async function (
  userId1: Types.ObjectId,
  userId2: Types.ObjectId
): Promise<Types.ObjectId[]> {
  const user1 = await this.findById(userId1).select('followers').lean().exec();
  const user2 = await this.findById(userId2).select('followers').lean().exec();

  if (!user1 || !user2) {
    throw new Error('One or both users not found.');
  }

  const commonFollowers = user1.followers.filter((follower) =>
    user2.followers.includes(follower)
  );

  return commonFollowers;
};
userSchema.statics.findCommonFollowing = async function (
  userId1: Types.ObjectId,
  userId2: Types.ObjectId
): Promise<Types.ObjectId[]> {
  const user1 = await this.findById(userId1).select('following').lean().exec();
  const user2 = await this.findById(userId2).select('following').lean().exec();

  if (!user1 || !user2) {
    throw new Error('One or both users not found.');
  }

  const commonFollowing = user1.following.filter((_following) =>
    user2.following.includes(_following)
  );

  return commonFollowing;
};
userSchema.statics.searchUsersWithCommonFollowing = async function (
  userId: Types.ObjectId,
  query: string
): Promise<User[]> {
  try {
    const currentUser = await this.findById(userId).select('following').exec();

    if (!currentUser) {
      throw new Error('User not found.');
    }

    const users = await this.find({
      $and: [
        { _id: { $ne: userId } }, // Exclude the current user from search results
        {
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { name: { $regex: query, $options: 'i' } },
          ],
        },
      ],
    })
      .select('username name profilePicture following')
      .populate('following', 'username');

    // Add a property to each user indicating common following
    users.forEach((user) => {
      const commonFollowing = currentUser.following.filter((userId) =>
        user.following.includes(userId)
      );
      user._doc.commonFollowing = commonFollowing;
    });

    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.models.User || mongoose.model<User>('User', userSchema);

export default User;