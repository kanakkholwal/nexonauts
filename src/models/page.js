import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
    enum: ['article','tool', 'page', 'category', 'tag', 'author', 'search', 'home', '404'],
  },
  views: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Page || mongoose.model('Page', pageSchema);
