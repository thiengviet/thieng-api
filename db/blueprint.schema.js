var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var Blueprint = new mongoose.Schema({
  content: { type: String },
  tree: { type: Object },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  mode: { type: String, enum: ['public', 'private'], default: 'public' }
});

/**
 * Plugins
 */
Blueprint.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('Blueprint', Blueprint);