var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var File = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  source: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

/**
 * Plugins
 */
File.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('File', File);