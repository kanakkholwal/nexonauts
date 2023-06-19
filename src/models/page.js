import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  action: {
    type: String,
    required: true,
    trim: true,
    enum: ['view', 'share'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
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
    enum: ['article', 'tool', 'page', 'category', 'tag', 'author', 'search', 'home', '404', 'dashboard','unnecessary'],
  },
  analytics: [analyticsSchema],
});

export default mongoose.models.Page || mongoose.model('Page', pageSchema);
