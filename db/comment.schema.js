var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

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
});

/**
 * Plugins
 */
Comment.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('Comment', Comment);