var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var User = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  service: { type: String, required: true },
  email: { type: String, required: true },
  displayname: { type: String },
  avatar: { type: String },
});

/**
 * Plugins
 */
User.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('User', User);