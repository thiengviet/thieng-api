var mongoose = require('mongoose');

/**
 * Schema
 */
var Comment = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId },
  blueprint: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  likeUserIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  dislikeUserIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  content: { type: String },
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('Comment', Comment);