var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var Item = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  service: { type: String, required: true },
  email: { type: String, required: true },
  displayname: { type: String },
  avatar: { type: String },
  panel: { type: String },
  description: { type: String },
});

/**
 * Plugins
 */
Item.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('Item', Item);