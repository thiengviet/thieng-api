var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var User = new mongoose.Schema({
  service: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  displayname: { type: String },
  avatar: { type: String },
  panel: { type: String },
  phone: { type: String },
  addresses: { type: [String], default: [] },
  description: { type: String },
  role: { type: String, enum: ['root', 'admin', 'user'], default: 'user' }
});

/**
 * Plugins
 */
User.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('User', User);