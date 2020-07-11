var mongoose = require('mongoose');

/**
 * Schema
 */
var Comment = new mongoose.Schema({
  target: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  likeUserIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  dislikeUserIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  contents: { type: String, required: true },
  replies: { type: [mongoose.Schema.Types.ObjectId], default: [] },
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('Comment', Comment);