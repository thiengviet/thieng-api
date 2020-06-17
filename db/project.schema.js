var mongoose = require('mongoose');

/**
 * Schema
 */
var Project = new mongoose.Schema({
  content: { type: String },
  blueprint: { type: Object },
  thumbnail: { type: mongoose.Schema.Types.ObjectId },
  commentIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  likeUserIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  dislikeUserIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, enum: ['public', 'private'], default: 'public' }
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('Project', Project);