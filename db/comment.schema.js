var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var Comment = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId },
  paper: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
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